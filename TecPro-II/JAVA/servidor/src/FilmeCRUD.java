import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class FilmeCRUD extends JFrame {
    private final Connection connection; // Variável de instância para a conexão JDBC


    private final List<Filme> filmes;
    private DefaultListModel<String> listModel; //entender como funciona o array de string
    private final JList<String> filmeList;

    private final JTextField tituloTextField;
    private final JTextField diretorTextField;
    private final JTextField anoTextField;
    private final JTextArea sinopseTextArea;
    private final JTextField notaTextField;

    private final JTextField urlFotoTextField;

    public FilmeCRUD(Connection connection) { //contrutor
        super("Administração de Filmes");

        this.connection = connection;

        filmes = new ArrayList<>();
        listModel = new DefaultListModel<>();
        filmeList = new JList<>(listModel);


        JButton adicionarButton = new JButton("Adicionar");
        JButton editarButton = new JButton("Editar");
        JButton removerButton = new JButton("Remover");

        adicionarButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                adicionarFilme();
            }
        });

        editarButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    editarFilme();
                } catch (SQLException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });

        removerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    removerFilme();
                } catch (SQLException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });


        JPanel botoesPanel = new JPanel(new FlowLayout());
        botoesPanel.add(adicionarButton);
        botoesPanel.add(removerButton);
        botoesPanel.add(editarButton);


        JPanel formularioPanel = new JPanel(new GridLayout(6, 2));
        formularioPanel.add(new JLabel("Título:"));
        formularioPanel.add(tituloTextField = new JTextField());
        formularioPanel.add(new JLabel("Diretor:"));
        formularioPanel.add(diretorTextField = new JTextField());
        formularioPanel.add(new JLabel("Ano de Lançamento:"));
        formularioPanel.add(anoTextField = new JTextField());
        formularioPanel.add(new JLabel("Sinopse:"));
        formularioPanel.add(new JScrollPane(sinopseTextArea = new JTextArea()));
        formularioPanel.add(new JLabel("Nota:"));
        formularioPanel.add(notaTextField = new JTextField());
        formularioPanel.add(new JLabel("Url Foto:"));
        formularioPanel.add(urlFotoTextField = new JTextField());


        setLayout(new BorderLayout());
        add(new JScrollPane(filmeList), BorderLayout.WEST);
        add(formularioPanel, BorderLayout.CENTER);
        add(botoesPanel, BorderLayout.SOUTH);

        setSize(700, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setVisible(true);

        dados();
        atualizarListModel();
    }

    public void dados(){
        String sql = "SELECT * FROM PRATICAS2.filme"; // Consulta SQL para selecionar todos os registros

        try (PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                int idFilme = resultSet.getInt("idFilme");
                String titulo = resultSet.getString("Titulo");
                String diretor = resultSet.getString("diretor");
                int ano = resultSet.getInt("Ano");
                String sinopse = resultSet.getString("Sinopse");
                float nota = resultSet.getFloat("Nota");

                String urlFoto = resultSet.getString("url_foto");
                // Crie um objeto Filme com os dados do registro atual
                Filme filme = new Filme(idFilme, titulo, diretor, ano, sinopse, nota, urlFoto);

                // Adicione o objeto Filme à lista de filmes
                filmes.add(filme);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Lide com a exceção de SQL aqui
        }
    }

    private void atualizarListModel() {
        DefaultListModel<String> newListModel = new DefaultListModel<>();

        String sql = "SELECT Titulo FROM PRATICAS2.ViewFilmes ORDER BY Titulo ASC";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String titulo = resultSet.getString("Titulo");
                newListModel.addElement(titulo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Lide com a exceção de SQL aqui
        }

        // Substitua o listModel existente pelo novo listModel com os títulos atualizados
        listModel = newListModel;
        filmeList.setModel(listModel);
    }

    private void adicionarFilme() {
        String titulo = tituloTextField.getText();
        String diretor = diretorTextField.getText();
        int ano = Integer.parseInt(anoTextField.getText());
        String sinopse = sinopseTextArea.getText();
        float nota = Float.parseFloat(notaTextField.getText());

        String url_foto = urlFotoTextField.getText();

        Filme filme = new Filme(titulo, diretor, ano, sinopse, nota, url_foto);
        filmes.add(filme);


        String sql = "INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, Sinopse, Nota, url_foto) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, titulo);
            statement.setString(2, diretor);
            statement.setInt(3, ano);
            statement.setString(4, sinopse);
            statement.setFloat(5, nota);
            statement.setString(6, url_foto);
            statement.executeUpdate();

            System.out.println("Adicionadinho com sucesso");
        } catch (SQLException e) {
            e.printStackTrace();
            // Lide com a exceção de SQL aqui
        }

        limparCampos();
        atualizarListModel();
    }

    private void mostrarDadosIndice() throws SQLException {
        int selectedIndex = filmeList.getSelectedIndex();

        Filme filmeSelecionado = filmes.get(selectedIndex); // Obtenha o filme selecionado da lista
        int idFilme = filmeSelecionado.getIdFilme(); // Obtenha o ID do filme selecionado
        String sql = "SELECT * FROM PRATICAS2.filme WHERE idFilme = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, idFilme);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    filmeSelecionado = new Filme(
                            idFilme, // Use o ID obtido anteriormente
                            resultSet.getString("Titulo"),
                            resultSet.getString("diretor"),
                            resultSet.getInt("Ano"),
                            resultSet.getString("Sinopse"),
                            resultSet.getFloat("Nota"),
                            resultSet.getString("url_foto")
                    );
                    tituloTextField.setText(filmeSelecionado.getTitulo());
                    diretorTextField.setText(filmeSelecionado.getDiretor());
                    anoTextField.setText(Integer.toString(filmeSelecionado.getAnoLancamento()));
                    sinopseTextArea.setText(filmeSelecionado.getSinopse());
                    notaTextField.setText(Float.toString(filmeSelecionado.getNota()));
                    urlFotoTextField.setText(filmeSelecionado.getUrl_foto());
                }
            }
        }
    }

    private void editarFilme() throws SQLException {
        mostrarDadosIndice();
    }

    private void removerFilme() throws SQLException {
        int selectedIndex = filmeList.getSelectedIndex();

        Filme filmeSelecionado = filmes.get(selectedIndex);
        int idFilme = filmeSelecionado.getIdFilme();

        String sql = "DELETE FROM PRATICAS2.filme  WHERE idFilme = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, idFilme);
            statement.executeUpdate();
        }
        filmes.remove(selectedIndex);
        atualizarListModel();
        limparCampos();
    }

    private void limparCampos() {
        tituloTextField.setText("");
        diretorTextField.setText("");
        anoTextField.setText("");
        sinopseTextArea.setText("");
        notaTextField.setText("");
        urlFotoTextField.setText("");
        filmeList.clearSelection();
    }

    public static void main(String[] args) {
        Connection connection = null;

        final String URL = "jdbc:sqlserver://regulus.cotuca.unicamp.br:1433;database=BD23121;user=BD23121;password=BD23121;encrypt=true;trustServerCertificate=true";
        try {
            connection = DriverManager.getConnection(URL);
            System.out.println("Conexão estabelecida com sucesso.");
        } catch (SQLException e) {
            e.printStackTrace();
            System.exit(1);
        }

        Connection finalConnection = connection;
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new FilmeCRUD(finalConnection); // Passe a conexão para o construtor
            }
        });
    }
}

