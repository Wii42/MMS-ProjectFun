package src;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;

/*very simple QuizTest not very sophisticated GUI but it seems to sort of work*/
public class QuizTest extends JFrame implements ActionListener {
    JLabel label;
    JRadioButton[] radioButtons = new JRadioButton[5];
    JButton btnNext;
    JButton btnResult;
    ButtonGroup bg;
    int count = 0, current = 0;
//    int[] m = new int[10];
    QuizTest(String s) {
            super(s);
            label = new JLabel();
            add(label);
            bg = new ButtonGroup();
            for(int i=0; i<5; i++){
                radioButtons[i] = new JRadioButton();
                add(radioButtons[i]);
                bg.add(radioButtons[i]);
        }

        btnNext =new JButton ("Next");
        btnResult = new JButton("Result");
        btnResult.setVisible(false);
        btnResult.addActionListener(this);
        btnNext.addActionListener(this);
        add(btnNext);
        add(btnResult);
        setData();
        label.setBounds(30, 40, 450, 20);
        radioButtons[0].setBounds(50, 80, 450, 20);
        radioButtons[1].setBounds(50, 110, 200, 20);
        radioButtons[2].setBounds(50, 140, 200, 20);
        radioButtons[3].setBounds(50, 170, 200, 20);
        btnNext.setBounds(100, 240, 100, 30);
        btnResult.setBounds(270, 240, 100, 30);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    setLayout(null);

    setLocation(250, 100);
        setVisible(true);
        setSize(600, 350);
    }
    void setData() {
        radioButtons[4].setSelected(true);
//Question 1
        if (current == 1) {
            label.setText("Q1: Which is the off language for Android Development?");
            radioButtons[0].setText("Java");
            radioButtons[1].setText("C++");
            radioButtons[2].setText("Kotlin");
            radioButtons[3].setText("JavaScript");
        }
//Question 2
        if (current == 2) {
            label.setText("Q2: What is the default value of a boolean variable?");
            radioButtons[0].setText("false");
            radioButtons[1].setText("true");
            radioButtons[2].setText("null");
            radioButtons[3].setText("not defined");
        }
//Question 3
        if (current == 3) {
            label.setText("Q3: What is function overloading?");
            radioButtons[0].setText("none of the above");
            radioButtons[1].setText("same name but different return types");
            radioButtons[2].setText("same name same params bt different param names");
            radioButtons[3].setText("method with same name but different params");
        }
//Question 4
        if (current == 4) {
            label.setText("Q4: Which is the off language for Android Development?");
            radioButtons[0].setText("Java");
            radioButtons[1].setText("C++");
            radioButtons[2].setText("Kotlin");
            radioButtons[3].setText("JavaScript");
        }
        label.setBounds(30, 40, 450, 20);
        for (int i = 0, j = 0; i <= 90; i += 30, j++) {
            radioButtons[j].setBounds(50, 80 + i, 200, 20);
        }
    }
    boolean checkAnswer(){
            if(current==1){
                return (radioButtons[1].isSelected());
            }
            if(current==2){
                return (radioButtons[1].isSelected());
            }
            if(current==3){
                return (radioButtons[0].isSelected());
            }
            if(current==4){
                return (radioButtons[3].isSelected());
            }

                return false;
        }

    public static void main(String[] args) {
        new QuizTest("Simple Quiz Test");
        }
    @Override
    public void actionPerformed(ActionEvent e) {
            if(e.getSource()==btnNext){
                if(checkAnswer())
                    count = count +1;
                current++;
                setData();
                if(current==4){
                    btnNext.setEnabled(false);
                    btnResult.setVisible(true);
                    btnResult.setText("Result");
                }
            }
        if(e.getActionCommand().equals("Result")){
            if(checkAnswer())
                count = count +1;
            current++;
            JOptionPane.showMessageDialog(this, "Correct answers are " +count);
            System.exit(0);
        }
    }
}
