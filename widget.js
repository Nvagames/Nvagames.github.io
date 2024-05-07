                var elementsforscroll = ['weatherwidgetmainmenu', 'musicwidgetmainmenu'];
              var elementstitleforscroll = ['0', 'musictitlewidget'];

              var currentindexmainmenu = 0;
              var nexttitle = currentindexmainmenu + 1
              var isscrolling = false
              function settitlenext() {
                document.getElementById(elementstitleforscroll[nexttitle]).style.animation = ''
                document.getElementById(elementstitleforscroll[nexttitle]).style.animation = 'settitlenext 0.5s'
                document.getElementById(elementstitleforscroll[nexttitle]).style.transform = 'translateX(-50%)'
                document.getElementById(elementstitleforscroll[nexttitle]).style.left = '50%'
                document.getElementById(elementstitleforscroll[nexttitle]).style.margin = 0
                document.getElementById(elementstitleforscroll[nexttitle]).style.top = '20px'
              }
              
              function fixtitlecur() {

                document.getElementById(elementstitleforscroll[1]).style.animation = ''
                document.getElementById(elementstitleforscroll[1]).style.animation = 'fixtitlenext 0.5s'
                document.getElementById(elementstitleforscroll[1]).style.transform = 'translateX(0%)'
                document.getElementById(elementstitleforscroll[1]).style.left = '0%'
                document.getElementById(elementstitleforscroll[1]).style.margin = '15px'
                document.getElementById(elementstitleforscroll[1]).style.top = '0px'
              }

              function setupwidget() {
                document.getElementById(elementsforscroll[0]).style.transform = 'translateY(-50%)'
                document.getElementById(elementsforscroll[1]).style.transform = 'translateY(100%)'
                settitlenext()
                
              }
              setupwidget()

              function scrolldownwidget() {
                if(elementsforscroll[currentindexmainmenu + 1] && isscrolling === false) {
                  isscrolling = true

                  setTimeout(() => {
                    isscrolling = false
                  }, 300);

                  document.getElementById(elementsforscroll[currentindexmainmenu]).style.animation = ''
                  document.getElementById(elementsforscroll[currentindexmainmenu + 1]).style.animation = ''

                  document.getElementById(elementsforscroll[currentindexmainmenu]).style.animation = 'scrolldownwidgetto 0.5s'

                  document.getElementById(elementsforscroll[currentindexmainmenu]).style.transform = 'translateY(-200%)'

                  document.getElementById(elementsforscroll[currentindexmainmenu + 1]).style.animation = 'scrollupwidgetto 0.5s'

                  document.getElementById(elementsforscroll[currentindexmainmenu + 1]).style.transform = 'translateY(-50%)'
                  
                  currentindexmainmenu = currentindexmainmenu + 1
                  
                  if(currentindexmainmenu === 1) {
                    fixtitlecur()
                  }
                } else {

                }
              }
              function scrollupwidget() {
                if(elementsforscroll[currentindexmainmenu - 1] && isscrolling === false) {

                  isscrolling = true

                  setTimeout(() => {
                    isscrolling = false
                  }, 300);


                  document.getElementById(elementsforscroll[currentindexmainmenu]).style.animation = 'scrollupwidgetfrom 0.5s'

                  document.getElementById(elementsforscroll[currentindexmainmenu]).style.transform = 'translateY(100%)'

                  document.getElementById(elementsforscroll[currentindexmainmenu - 1]).style.animation = 'scrolldownwidgetfrom 0.5s'

                  document.getElementById(elementsforscroll[currentindexmainmenu - 1]).style.transform = 'translateY(-50%)'
                  currentindexmainmenu = currentindexmainmenu - 1
                  if(currentindexmainmenu === 0) {
                    settitlenext()
                  }
                }
              }

              var mainMenuWidget = document.getElementById("mainmenuwidget");

              var lastScrollTop = 0;

              function handleScroll(event) {
                var currentScrollTop = event.deltaY || event.touches[0].clientY - lastScrollTop;

                if (currentScrollTop > lastScrollTop) {
                  //console.log("Scrolling down");
                  scrolldownwidget()
                } else if (currentScrollTop < lastScrollTop) {
                  //console.log("Scrolling up");
                  scrollupwidget()
                }

                lastScrollTop = currentScrollTop;
              }

              mainMenuWidget.addEventListener("wheel", handleScroll);
              mainMenuWidget.addEventListener("touchmove", handleScroll);


              //weather

              
              function getweather() {
                // Function to get user's estimated location
                function getUserLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition, showError);
                    } else {
                        console.error("Geolocation is not supported by this browser.");
                    }
                }

                // Function to display position
                function showPosition(position) {
                    document.getElementById('requestweather').style.animation = 'UserACWeather 0.5s'
                    setTimeout(() => {
                      document.getElementById('requestweather').style.display = 'none'
                    }, 450);
                    const userLatitude = position.coords.latitude;
                    const userLongitude = position.coords.longitude;
                    getCityFromCoordinates(userLatitude, userLongitude);
                }

                // Function to handle errors
                function showError(error) {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            console.error("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.error("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.error("An unknown error occurred.");
                            break;
                    }
                }

                // Function to get city from coordinates
                function getCityFromCoordinates(latitude, longitude) {
                    $.ajax({
                        url: `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                        success: function(data) {
                            const city = data.address.city || data.address.town || data.address.village || data.address.county;
                            //$("#currentCity2").text(`${city}`);
                            getCurrentWeather(latitude, longitude, city);
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching city data:", error);
                        }
                    });
                }

                // Function to get current weather
                function getCurrentWeather(latitude, longitude, city) {
                  console.log(city);
                  document.getElementById('CurCity').innerHTML = city;
              
                  $.ajax({
                      url: `https://api.weather.gov/points/${latitude},${longitude}`,
                      success: function(data) {
                          const observationStationsUrl = data.properties.observationStations;
              
                          // Fetching observation stations
                          $.ajax({
                              url: observationStationsUrl,
                              success: function(stationsData) {
                                  // Getting the first observation station
                                  const stationUrl = stationsData.features[0].id;
              
                                  // Fetching current conditions from the observation station
                                  $.ajax({
                                      url: `${stationUrl}/observations/latest`,
                                      success: function(observationData) {
                                          const currentObservation = observationData.properties;
              
                                          // Convert Celsius to Fahrenheit and round to whole number
                                          const tempCelsius = currentObservation.temperature.value;
                                          const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
              
                                          // Displaying current weather details in Fahrenheit without decimal
                                          $("#CurTemp").text(`${tempFahrenheit} °F`);
                                          $("#CurDesc").text(`${currentObservation.textDescription}`);
                                          // Adjusting image based on weather condition
                                          if (currentObservation.textDescription.includes('Rain')) {
                                              document.getElementById('iconweather').setAttribute('src', './iconsweather/rain.png');
                                          } else if (currentObservation.textDescription.includes('Sunny')) {
                                              document.getElementById('iconweather').setAttribute('src', './iconsweather/sunny.png');
                                          } else if (currentObservation.textDescription.includes('Cloudy')) {
                                              document.getElementById('iconweather').setAttribute('src', './iconsweather/cloudy.png');
                                          } else if (currentObservation.textDescription.includes('Snow')) {
                                              document.getElementById('iconweather').setAttribute('src', './iconsweather/snow.png');
                                          }
                                          setTimeout(() => {
                                            document.getElementById('DataWeather').style.animation = 'ShowDataWeather 0.5s';
                                            document.getElementById('DataWeather').style.display = 'block';
                                          }, 300);
                                          
                                      },
                                      error: function(xhr, status, error) {
                                          console.error("Error fetching current weather data:", error);
                                      }
                                  });
                              },
                              error: function(xhr, status, error) {
                                  console.error("Error fetching observation station data:", error);
                              }
                          });
                      },
                      error: function(xhr, status, error) {
                          console.error("Error fetching weather data:", error);
                      }
                  });
              }
              

                // Call function to get user location
                getUserLocation();
              };