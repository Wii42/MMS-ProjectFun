import java.awt.Desktop;
import java.net.URI;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.security.Key;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws AWTException {
        try {
            // Provide the website URL here
            String url = "https://www.google.com";

            // Create a URI object
            URI uri = new URI(url);

            // Check if the Desktop is supported on the current platform
            if (Desktop.isDesktopSupported()) {
                Desktop desktop = Desktop.getDesktop();
                if (desktop.isSupported(Desktop.Action.BROWSE)) {
                    desktop.browse(uri);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        while (true) {


            try {
                TimeUnit.SECONDS.sleep(1);

                Robot robot = new Robot();

                // Simulate a key press event
                int keyEvent = KeyEvent.VK_1; // Change this to the desired key event
                robot.keyPress(keyEvent); // Simulate a key press
                robot.keyRelease(keyEvent); // Simulate a key release
            } catch (AWTException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }}



