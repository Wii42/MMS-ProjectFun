import java.awt.*;
import java.awt.event.KeyEvent;

/*this is a test babs*/
public class KeyPress {
    public static void main(String[] args) throws AWTException {
        simulateKeyPress();
    }

    public static void simulateKeyPress() throws AWTException {
        Robot r = new Robot();
        r.keyPress(KeyEvent.VK_1);
        r.keyRelease(KeyEvent.VK_1);
    }
}