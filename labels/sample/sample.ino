// include the library code:
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

char i;
const char message1[17] = "2x16 LCD Display";

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
}

void loop() {
  // Print a message to the LCD.
  lcd.clear();
 
  lcd.setCursor(0, 0);
  lcd.print("TKJ Electronics");
  lcd.setCursor(0, 1);
  lcd.print("LCM-S01602DTR/M");
  delay(2000);
 
  lcd.setCursor(16, 0);  
  lcd.autoscroll();    
  for (i = 0; i < 16; i++) {
    lcd.print(message1[i]);
    delay(100);
  }
  lcd.noAutoscroll();  
 
  for (i = 0; i < 4; i++) {
    lcd.setCursor(16, 1);
    lcd.print("                ");
    delay(500);      
    lcd.setCursor(16, 1);
    lcd.print("   Only $5.00   ");
    delay(500);
  }
 
  delay(1000);
}
