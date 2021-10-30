 <!-- FBLOGIN -->
  <script>
    function statusChangeCallback(response) {
      // Called with the results from FB.getLoginStatus().
      console.log('statusChangeCallback')
      console.log(response) // The current login status of the person.
      if (response.status === 'connected') {
        // Logged into your webpage and Facebook.
        mixpanel.track("CTAs", {
          "Element": "Login"
        });
        otpshow()
      } else {
        // Not logged into your webpage or we are unable to tell.
        alert('Please Login To Post Your Score');
      }
    }

    function checkLoginState() {
      // Called when a person is finished with the Login Button.
      FB.getLoginStatus(function (response) {
        // See the onlogin handler
        statusChangeCallback(response)
      })
    }

   // otp scripts
    
    function otpshow() {
    	      document.getElementById('otp').style.display = 'block';

    }
    

function sendOTP() {
//var phoneValue = document.getElementById("tele").value;
//var phoneurl='https://b2bapi.zee5.com/device/sendotp.php?phoneno=+91';
window.phoneValue = document.getElementById("tele").value;

window.phoneurl='https://b2bapi.zee5.com/device/sendotp.php?phoneno=+91';  

const sendurl = phoneurl + phoneValue;
  
const Http = new XMLHttpRequest();
Http.open("GET", sendurl);
Http.send();
signup.style.display = 'none';
verify.style.display = 'block';
mixpanel.track("CTAs", {        
   "Element": "Submitted PhoneNum"
  });  
 

}

function verifyOTP() {
//var otpurl='https://b2bapi.zee5.com/device/verifyotp.php?phoneno=+91';
//var phoneValue = document.getElementById("tele").value;
//var otpvalue = document.getElementById("otpnum").value; 
  
  window.otpvalue = document.getElementById("otpnum").value;

window.otpurl='https://b2bapi.zee5.com/device/verifyotp.php?phoneno=+91'; 
const sendotpurl = otpurl + phoneValue + '&otp=' + otpvalue;
 const Http = new XMLHttpRequest();
Http.open("GET", sendotpurl);
Http.send();
verify.style.display = 'none'; 
ok.style.display = 'block'; 
 mixpanel.track("Screen View", {
 "Page Name": "Verified PhoneNum"
 });


}


function hideOTP() {
  otp.style.display = 'none';

}
    
    // end of otp scritps
    
    
    
    function testAPI() {
      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      console.log('Welcome!  Fetching your information.... ')
      FB.api(
        '/me',
        { fields: 'email,last_name,picture,first_name' },
        function (response) {
          if (response.id) {
            postData(
              'https://8btazx6thc.execute-api.ap-south-1.amazonaws.com/postscore',
              {
                id: response.id,
                firstname: response.first_name,
                lastname: response.last_name,
                score: document.getElementById('setcheckfont').innerHTML,
                profilePic: response.picture.data.url,
                email: response.email,
                phone: phoneValue;
              }
            )
              .then((data) => {
                console.log(
                  'Successful login for: ' + response.id,
                  response.first_name,
                  response.last_name,
                  response.picture.data.url,
                  response.email
                )
                mixpanel.track('Entered Leaderboard');
                document.getElementById('setcheckfont').innerHTML = ''
                /* document.getElementById('firstname').innerHTML =
                  'FIRST NAME :' + response.first_name
                document.getElementById('lastname').innerHTML =
                  'LAST NAME :' + response.last_name
                document.getElementById('email').innerHTML =
                  'EMAIL :' + response.email

                document.getElementById('imageval').src =
                  'http://graph.facebook.com/' + response.id + '/picture'

                document.getElementById('status').innerHTML =
                  'Thanks for logging in, ' + response.name + '!' */
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
      )
    }

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      return response // parses JSON response into native JavaScript objects
    }
  </script>