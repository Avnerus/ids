// include the library code:
#include <LiquidCrystal.h>
#include <ArduinoJson.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

char i;
const char message1[17] = "2x16 LCD Display";
DynamicJsonBuffer jsonBuffer;
JsonObject* root;
JsonObject* root2;


void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  Serial.begin(115200);

  
  // Parse the configuration json
   String input = 
  "{\"labels\" : [{\"lines\": [\"Avner is the\",\"boo\", \"yeah baby\",\"good\"]},{\"lines\": [\"Roee is the\",\"coo\",\"oh noo\",\"Sad\"]}]}";
 "{ \"labels\": [ { \"lines\": [ \" Arts, Design\", \"and Architecture\" ] }, { \"lines\": [ \"Curating, Managing\", \"and Mediating Ar\", \" t\" ] }, { \"lines\": [ \" New Media - \", \" New Media\", \" Design\", \"and Production\" ] }, { \"lines\": [\"what\", \"what\"] }]}";//, { \"lines\": [ \" Buissness\", \"and Econonomics\" ] }, { \"lines\": [ \" Business Control\", \"ler as a Strateg\", \"ic Partner\" ] }, { \"lines\": [ \" Technology\", \"and Engineering\" ] }, { \"lines\": [ \" Materials and \", \"sustainable use\", \" of natural\", \" resources\" ] }, { \"lines\": [ \"Advanced Materia\", \"ls for Innovatio\", \"n and Sustaina\", \" bility\" ] }, { \"lines\": [ \"Advanced Materia\", \"ls for Innovatio\", \"n and Sustaina\", \" bility\" ] }, { \"lines\": [ \" Human Computer\", \"Interaction and\", \"Design\" ] }, { \"lines\": [ \"Entrepreneurship\", \" and\", \" Innovation\", \" Management\" ] }, { \"lines\": [ \" European Mining\", \" Minerals and\", \"Environmental Pro\", \"gram Management\" ] } ] }";

 //String input2 = "{\"labels\" : [{\"lines\": [\"Avner is the\",\"boo\", \"yeah baby\",\"good\"]},{\"lines\": [\"Roee is the\",\"coo\",\"oh noo\",\"Sad\"]}]}";
 

 // root2 = &(jsonBuffer.parseObject(input2));
  root = &(jsonBuffer.parseObject(input));

 if (!(*root).success())
 {
  Serial.println("parseObject() failed");
  return;
 } else {
  Serial.println("parseObject() success");
 }
  

}

void loop() {
  // Print a message to the LCD.
  lcd.clear();

  // Choose a random message
  int index = random((*root)["labels"].size());
  int numLines = (*root)["labels"][index]["lines"].size();
  lcd.setCursor(0, 0);
  const char* text = (*root)["labels"][index]["lines"][0].asString();
  lcd.print(text);

  if (numLines > 1) {
    text = (*root)["labels"][index]["lines"][1].asString();
    lcd.setCursor(0, 1);
    lcd.print(text);
  }

  if (numLines > 2) {
      delay(2000);
      lcd.setCursor(16, 0);  
      lcd.autoscroll();    
      String newText = (*root)["labels"][index]["lines"][2].asString();
      for (i = 0; i < newText.length(); i++) {
        lcd.print(newText[i]);
        delay(100);
      }
      for (i = 0; i < 16 - newText.length(); i++) {
        lcd.print(' ');
        delay(100);
      }
      lcd.noAutoscroll(); 
      if (numLines > 3) {            
            lcd.setCursor(16,1);
            lcd.print((*root)["labels"][index]["lines"][3].asString());
      }
                
  }
  
  delay(2000);
}
