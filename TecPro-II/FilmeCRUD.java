import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

public class FilmeCRUD extends JFrame {
    private final List<Filme> filmes;
    private final DefaultListModel<String> listModel; //entender como funciona o array de string
    private final JList<String> filmeList;
    private final JTextField tituloTextField;
    private final JTextField diretorTextField;
    private final JTextField anoTextField;
    private final JTextArea sinopseTextArea;
    private final JTextField notaTextField;

    public FilmeCRUD() { //contrutor
        super("Administração de Filmes");
        filmes = new ArrayList<>();
        listModel = new DefaultListModel<>();
        filmeList = new JList<>(listModel);

        JButton adicionarButton = new JButton("Adicionar");
        JButton editarButton = new JButton("Editar");
        JButton removerButton = new JButton("Remover");
        JButton salvarButton = new JButton("Salvar");

        salvarButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                salvar();
            }
        });

        adicionarButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                adicionarFilme();
            }
        });

        editarButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                editarFilme();
            }
        });

        removerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                removerFilme();
            }
        });


        JPanel botoesPanel = new JPanel(new FlowLayout());
        botoesPanel.add(adicionarButton);
        botoesPanel.add(removerButton);
        botoesPanel.add(salvarButton);
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

        setLayout(new BorderLayout());
        add(new JScrollPane(filmeList), BorderLayout.WEST);
        add(formularioPanel, BorderLayout.CENTER);
        add(botoesPanel, BorderLayout.SOUTH);

        setSize(700, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void adicionarFilme() {
        String titulo = tituloTextField.getText();
        String diretor = diretorTextField.getText();
        int ano = Integer.parseInt(anoTextField.getText());
        String sinopse = sinopseTextArea.getText();
        float nota = Float.parseFloat(notaTextField.getText());

        Filme filme = new Filme(titulo, diretor, ano, sinopse, nota);
        filmes.add(filme); //trocaria para a string de banco de dados
        listModel.addElement(filme.getTitulo());

        limparCampos();
    }
    
    private void mostrarDadosIndice(){
        int selectedIndex = filmeList.getSelectedIndex();
        tituloTextField.setText(filmes.get(selectedIndex).getTitulo());
        diretorTextField.setText(filmes.get(selectedIndex).getDiretor());
        anoTextField.setText(Integer.toString(filmes.get(selectedIndex).getAnoLancamento()));
        sinopseTextArea.setText(filmes.get(selectedIndex).getSinopse());
        notaTextField.setText(Float.toString(filmes.get(selectedIndex).getNota()));
    }

    private void editarFilme() {
        mostrarDadosIndice();
    }

    private void salvar() {
        int indice = filmeList.getSelectedIndex();
        if (indice != -1) {
            String titulo = tituloTextField.getText();
            String diretor = diretorTextField.getText();
            int ano = Integer.parseInt(anoTextField.getText());
            String sinopse = sinopseTextArea.getText();
            float nota = Float.parseFloat(notaTextField.getText());
            Filme filme = filmes.get(indice);

            filme.setTitulo(titulo);
            filme.setDiretor(diretor);
            filme.setAnoLancamento(ano);
            filme.setSinopse(sinopse);
            filme.setNota(nota);

            listModel.set(indice, filme.getTitulo());
            limparCampos();
        }
    }

    private void removerFilme() {
        int selectedIndex = filmeList.getSelectedIndex();
        if (selectedIndex != -1) {
            filmes.remove(selectedIndex);
            listModel.remove(selectedIndex);
            limparCampos();
        }
    }

    private void limparCampos() {
        tituloTextField.setText("");
        diretorTextField.setText("");
        anoTextField.setText("");
        sinopseTextArea.setText("");
        notaTextField.setText("");
        filmeList.clearSelection();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new FilmeCRUD();
            }
        });
    }
}

