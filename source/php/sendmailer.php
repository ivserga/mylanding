<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    // Файлы phpmailer
    require '/PHPMailer/src/Exception.php';
    require '/PHPMailer/src/PHPMailer.php';
    require '/PHPMailer/src/SMTP.php';
    
   
    // Переменные
    $name = $_POST['name'];
    $number = $_POST['number'];
    $email = $_POST['email'];
    // Настройки
    $mail = new PHPMailer;
    $mail->isSMTP(); 
    $mail->Host = 'smtp.yandex.ru'; 
    $mail->SMTPAuth = true; 
    $mail->Username = 'sptyi@yandex.ru'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
    $mail->Password = 'banzay'; // Ваш пароль
    $mail->SMTPSecure = 'ssl'; 
    $mail->Port = 465;
    $mail->setFrom('sptyi@yandex.ru'); // Ваш Email
    $mail->addAddress('218808@mail.ru'); // Email получателя
    $mail->addAddress('ivsa79@mail.ru'); // Еще один email, если нужно.
    $mail->CharSet = "UTF-8";
    /* Прикрепление файлов
    for ($ct = 0; $ct < count($_FILES[‘userfile’][‘tmp_name’]); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES[‘userfile’][‘name’][$ct]));
    $filename = $_FILES[‘userfile’][‘name’][$ct];
    if (move_uploaded_file($_FILES[‘userfile’][‘tmp_name’][$ct], $uploadfile)) {
    $mail->addAttachment($uploadfile, $filename);
    } else {
    $msg .= ‘Failed to move file to ‘ . $uploadfile;
    }
    } */
    
    // Письмо
    $mail->isHTML(true); 
    $mail->Subject = "Заявка с сайта"; // Заголовок письма
    $mail->Body = "Имя $name . Телефон $number . Почта $email"; // Текст письма
    // Результат
    if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
    echo 'ok';
    }
?>