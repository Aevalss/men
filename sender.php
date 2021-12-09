<?php
//telegram 
$token = "1998492477:AAEt9L5gAuJHa8OyEW4l0FTqkhYdkcsUsT0";
$chat_id = "-507255272";
$tosend = "unde4d13@yandex.ru"; //To:
$subject = "CK"; //Subject:
$from_name = "CK"; //From:
$from_email = "email@email.com"; //From:

////NO EDIT
if(!isset($_POST['act'])) {
	exit();
}
switch($_POST['act']) {
	case 'sender':
		if(empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['subject'])) {
			exit();
		}
		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$subject2 = $_POST['subject'];
		
		$arr = array(
		'Информация о заявке:' => $subject2,
        'Имя:' => $name,
        'Телефон:' => $phone
         );
		 
		 //Настраиваем внешний вид сообщения в телеграме
        foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
        }

		$msg  = "<p><strong>".$subject2."</strong></p>\r\n";
		$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
		$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject." ".$subject2)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok'));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	default: exit();
}
	$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


if ($sendToTelegram) {
	mail($sendto, $subject, $msg, $headers);
}
?>