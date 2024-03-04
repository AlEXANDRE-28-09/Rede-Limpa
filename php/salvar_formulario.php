
<?php
require 'vendor/autoload.php'; // Carrega o PHPMailer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dados de conexão com o banco de dados MySQL
    $servername = "localhost";
    $username = "root";
    $password = "1207Enzo";
    $dbname = "MySQL";

    // Coleta dos dados do formulário
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $endereco = $_POST['endereco'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];

    // Conexão com o banco de dados usando PDO
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Prepara a query para inserir os dados no banco de dados
        $stmt = $conn->prepare("INSERT INTO formulario (nome, sobrenome, endereco, telefone, email, mensagem) VALUES (:nome, :sobrenome, :endereco, :telefone, :email, :mensagem)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':sobrenome', $sobrenome);
        $stmt->bindParam(':endereco', $endereco);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mensagem', $mensagem);
        
        // Executa a query
        $stmt->execute();

        // Envia o e-mail
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.seudominio.com'; // Altere para o seu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'seu_email@seudominio.com'; // Altere para o seu e-mail
        $mail->Password = 'sua_senha'; // Altere para a sua senha
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('seu_email@seudominio.com', 'Seu Nome');
        $mail->addAddress('email@destinatario.com');

        $mail->Subject = 'Novo formulário submetido';
        $mail->Body = "Nome: $nome $sobrenome\nEndereço: $endereco\nTelefone: $telefone\nEmail: $email\nMensagem: $mensagem";

        if ($mail->send()) {
            echo "E-mail enviado com sucesso!";
        } else {
            echo "Erro ao enviar o e-mail: " . $mail->ErrorInfo;
        }
    } catch(PDOException $e) {
        echo "Erro na conexão com o banco de dados: " . $e->getMessage();
    }

    // Fecha a conexão com o banco de dados
    $conn = null;
}
?>


