<?
class google{
	function google_get_auth($Email,$Passwd,$source=null,$service=null,$accountType=null,$filename=null){
	$source = empty($source)?'DAYCRY-XUSER-1':$source;
	$service = empty($service)?'youtube':$service;
	$accountType = empty($accountType)?'GOOGLE':$accountType;
	$filename = empty($filename)?null:$filename;
	$error_code['BadAuthentication'] = 'The login request used a username or password that is not recognized.';
	$error_code['NotVerified'] = 'The account email address has not been verified. The user will need to access their Google account directly to resolve the issue before logging in using a non-Google application.';
	$error_code['TermsNotAgreed'] = 'The user has not agreed to terms. The user will need to access their Google account directly to resolve the issue before logging in using a non-Google application.';
	$error_code['CaptchaRequired'] = 'A CAPTCHA is required. (A response with this error code will also contain an image URL and a CAPTCHA token.)';
	$error_code['Unknown'] = 'The error is unknown or unspecified; the request contained invalid input or was malformed.';
	$error_code['AccountDeleted'] = 'The user account has been deleted.';
	$error_code['AccountDisabled'] = 'The user account has been disabled.';
	$error_code['ServiceDisabled'] = 'The user\'s access to the specified service has been disabled. (The user account may still be valid.)';
	$error_code['ServiceUnavailable'] = 'The service is not available; try again later.';
	// Authoriza
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://www.google.com/accounts/ClientLogin");
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	$data = array(	'accountType' => 'GOOGLE',
					'Email' => $Email,
					'Passwd' => $Passwd,
					'source'=> $source,
					'service'=> $service);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	$response = curl_exec($ch);
	curl_close($ch);
	// Explode Result
	preg_match("/Auth=([a-z0-9_\-]+)/i", $response, $matches);
	$xauth = $matches[1];
	if(!empty($xauth)){
		if(!empty($filename)){
			$fp = fopen($filename,"w");
			fwrite($fp,$xauth);
			fclose($fp);
		}
		$return['auth'] = $xauth;
		$return['email'] = $Email;
		$return['pass'] = $Passwd;
	}else{
		$key = trim(str_replace("Error=","",$response));
		$return['error_message'] = $error_code[$key];
		$return['email'] = $Email;
		$return['pass'] = $Passwd;
	}
	return $return;
	}
}