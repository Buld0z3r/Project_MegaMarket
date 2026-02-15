/*
  # Aktualizacja opisów produktów

  1. Zmiany
    - Dodanie szczegółowych opisów dla wszystkich produktów
    - Opisy zawierają informacje o produktach, specyfikację i zalety

  2. Produkty zaktualizowane
    - Wszystkie 22 produkty otrzymują szczegółowe opisy
*/

-- Elektronika
UPDATE products SET description = 'Wydajny laptop biznesowy wyposażony w procesor Intel Core i7 najnowszej generacji, 16GB pamięci RAM DDR5 oraz szybki dysk SSD o pojemności 512GB. Idealny do pracy biurowej, edycji multimediów i multitaskingu. Wyświetlacz Full HD 15,6" zapewnia doskonałą jakość obrazu. Klawiatura z podświetleniem LED, czytnik linii papilarnych i złącza USB-C/Thunderbolt. Bateria o długim czasie pracy - do 10 godzin.'
WHERE name = 'Laptop Premium 15"';

UPDATE products SET description = 'Bezprzewodowe słuchawki nauszne z aktywną redukcją szumów ANC, które zapewniają krystalicznie czysty dźwięk i doskonałą izolację od otoczenia. Wbudowane mikrofony z redukcją echa dla doskonałej jakości rozmów. Czas pracy na baterii do 30 godzin. Wygodne poduszki z memory foam, składana konstrukcja z eleganckim etui. Obsługa asystentów głosowych i łączność Bluetooth 5.3.'
WHERE name = 'Słuchawki bezprzewodowe';

UPDATE products SET description = 'Zaawansowany zegarek sportowy z wbudowanym GPS, monitorem tętna, pulsoksymetrem i czujnikiem SpO2. Śledzi ponad 100 trybów sportowych, monitoruje sen, stres i poziom energii. Wodoszczelność do 5ATM, ekran AMOLED zawsze widoczny. Bateria wytrzymuje do 14 dni. Powiadomienia ze smartfona, płatności zbliżeniowe, mapy offline. Współpracuje z iOS i Android.'
WHERE name = 'Smartwatch Sport';

UPDATE products SET description = 'Profesjonalna klawiatura mechaniczna dla graczy z przełącznikami mechanicznymi zapewniającymi precyzję i szybkość reakcji. Wielokolorowe podświetlenie RGB z możliwością personalizacji efektów świetlnych. Klawisze makro, dedykowany pokrętło do regulacji głośności, odporna na zachlapania. N-key rollover i anti-ghosting. Solidna metalowa podstawa, odczepiana podkładka pod nadgarstki.'
WHERE name = 'Klawiatura mechaniczna RGB';

-- Moda
UPDATE products SET description = 'Klasyczny t-shirt wykonany w 100% z wysokiej jakości bawełny organicznej. Miękki, przewiewny materiał idealny na ciepłe dni. Dostępny w wielu kolorach i rozmiarach od XS do XXL. Wysoka gramatura 180g/m² zapewnia trwałość. Wzmocnione szwy, szeroki kołnierzyk, krój unisex. Materiał nie kurczy się po praniu. Certyfikat OEKO-TEX Standard 100.'
WHERE name = 'T-shirt bawełniany';

UPDATE products SET description = 'Modne jeansy męskie w stylu slim fit z elastyczną domieszką dla maksymalnego komfortu. Wykonane z wysokiej jakości denimu, miękkie i przyjemne w dotyku. Klasyczny 5-kieszeniowy design, zapinane na guzik. Dostępne w kilku wariantach kolorystycznych. Idealnie dopasowują się do sylwetki. Można prać w pralce. Skład: 98% bawełna, 2% elastan.'
WHERE name = 'Jeansy slim fit';

UPDATE products SET description = 'Wygodne sneakersy sportowe do codziennego noszenia. Amortyzująca podeszwa z pianki EVA zapewnia komfort przez cały dzień. Przewiewna cholewka z materiału mesh, wzmacniana syntetycznymi elementami. Wyściełany język i kołnierz. Elastyczne sznurowanie. Nadają się do lekkiego joggingu, spacerów i noszenia na co dzień. Antypoślizgowa gumowa podeszwa.'
WHERE name = 'Sneakersy sportowe';

UPDATE products SET description = 'Ciepła i komfortowa bluza z kapturem wykonana z miękkiej bawełny z dodatkiem poliestru. Idealna na chłodniejsze dni. Praktyczna kieszeń kangurka, regulowany kaptur ze sznurkiem. Wewnątrz delikatnie ocieplana polar fleece. Szeroki wybór kolorów i rozmiarów. Rękawy zakończone ściągaczami. Doskonała do layeringu, relaksu w domu lub aktywności outdoor.'
WHERE name = 'Bluza z kapturem';

-- Sport i rekreacja
UPDATE products SET description = 'Profesjonalna mata do jogi o wymiarach 183 x 61 cm i grubości 6 mm. Wykonana z ekologicznego, nietoksycznego materiału TPE. Antypoślizgowa powierzchnia z obu stron zapewnia stabilność podczas trudnych pozycji. Doskonała amortyzacja chroni stawy. Łatwa do czyszczenia, lekka i łatwa do przewożenia. Pasek transportowy w zestawie. Idealna do jogi, pilatesu, ćwiczeń rozciągających i fitness.'
WHERE name = 'Mat do jogi';

UPDATE products SET description = 'Rower miejski damski/męski 28" z aluminiową ramą i 7-biegową przekładnią Shimano. Wygodne siodło sprężynowane, metalowe błotniki, bagażnik tylny o udźwigu 25kg. Oświetlenie LED zasilane dynamem. Solidna podpórka, dzwonek. Koła 28" z oponami przeciwprzebiciowymi. Hamulce V-brake, koszyk na zakupy w zestawie. Idealny do codziennych dojazdów po mieście.'
WHERE name = 'Rower miejski';

UPDATE products SET description = 'Zestaw regulowanych hantli obciążonych od 2 do 20 kg na każdy hantel. Innowacyjny system szybkiej zmiany obciążenia poprzez obrót pokrętła. Kompaktowa konstrukcja zastępuje 10 par tradycyjnych hantli. Ergonomiczne uchwyty z antypoślizgową powierzchnią. Solidna podstawa-stojak w zestawie. Idealne do domowej siłowni. Oszczędność miejsca i pieniędzy.'
WHERE name = 'Hantle regulowane';

UPDATE products SET description = 'Praktyczna butelka sportowa BPA-free o pojemności 1 litra ze zintegrowanym filtrem węglowym. Filtr usuwa chlor i nieprzyjemne zapachy, poprawiając smak wody. Szczelna zakrętka z klapką, pojemność 1000ml, wytrzymały tritan. Wąska szyjka idealnie pasuje do uchwytów na rowery. Łatwe czyszczenie, można myć w zmywarce. Dostępna w różnych kolorach. Idealna do sportu, wędrówek i codziennego użytku.'
WHERE name = 'Butelka sportowa 1L';

-- Książki
UPDATE products SET description = 'Fascynująca powieść kryminalna z wciągającą fabułą i nieoczekiwanymi zwrotami akcji. Bestseller 2024 roku, nagradzana przez krytyków i uwielbiania przez czytelników. Mistrzostwo w budowaniu napięcia, perfekcyjnie zarysowane postacie i atmosfera trzymająca w napięciu do ostatniej strony. Twarda oprawa, 432 strony. Książka idealna na prezent dla miłośników thrillerów psychologicznych.'
WHERE name = 'Powieść kryminalna';

UPDATE products SET description = 'Praktyczny poradnik psychologiczny napisany przez renomowanego terapeutę. Sprawdzone techniki radzenia sobie ze stresem, lękiem i wypaleniem zawodowym. Ćwiczenia mindfulness, techniki oddechowe, metody reorganizacji myślenia. Oparte na badaniach naukowych i wieloletnim doświadczeniu klinicznym. 280 stron pełnych wartościowej wiedzy i praktycznych wskazówek. Idealna lektura dla każdego, kto chce poprawić swoje samopoczucie.'
WHERE name = 'Poradnik psychologiczny';

UPDATE products SET description = 'Bogato ilustrowana książka kulinarna zawierająca ponad 200 przepisów z różnych zakątków świata. Kuchnia włoska, azjatycka, francuska, meksykańska i wiele innych. Przepisy krok po kroku ze zdjęciami, wskazówki dotyczące składników i technik kulinarnych. Dla początkujących i zaawansowanych kucharzy. Twarda oprawa, wysokiej jakości papier, pełnokolorowe fotografie. Doskonały prezent dla miłośników gotowania.'
WHERE name = 'Książka kulinarna';

-- Dom i ogród
UPDATE products SET description = '5-elementowy zestaw garnków ze stali nierdzewnej 18/10 najwyższej jakości. W zestawie: garnki o pojemności 2L, 3L, 4L, 6L oraz patelnia 24cm. Trójwarstwowe dno zapewnia równomierne rozłożenie ciepła. Pokrywki szklane z odprowadzeniem pary. Uchwyty pozostają chłodne. Nadają się do wszystkich źródeł ciepła, włącznie z indukcją. Można myć w zmywarce. Elegancki design i trwałość na lata.'
WHERE name = 'Zestaw garnków';

UPDATE products SET description = 'Nowoczesna lampa biurkowa LED z regulacją jasności i temperatury barwowej (3000K-6500K). Ochrona oczu - światło bez migotania i filtr niebieskiego światła. 5 poziomów jasności, elastyczne ramię z regulacją kąta 180°. Wbudowany port USB do ładowania urządzeń. Funkcja timera i pamięci ustawień. Energooszczędna technologia LED - żywotność 50 000 godzin. Idealna do pracy, nauki i czytania.'
WHERE name = 'Lampa biurkowa LED';

UPDATE products SET description = 'Wydajna sokowirówka wolnoobrotowa (slow juicer) zachowująca maksymalną ilość witamin i składników odżywczych. Cicha praca (tylko 60dB), szeroki wlot 75mm, system kropla-stop. W zestawie sitka drobne i grube, szczotka do czyszczenia. Wyciska soki z owoców, warzyw, zielonych liści i traw. Silnik 150W, mechanizm odwrotnego obrotu zapobiega zacięciom. Wszystkie części można myć w zmywarce.'
WHERE name = 'Sokowirówka';

UPDATE products SET description = 'Luksusowa pościel bawełniana 160x200 cm wykonana z wysokogatunkowej satynowej bawełny. Miękka, gładka i przyjemna w dotyku. Gęstość 200TC zapewnia trwałość i komfort. W zestawie: kołdra 160x200 cm, poszewka 70x80 cm. Głębokie, żywe kolory odporne na pranie. Dyskretny wzór, eleganckie wykończenie. Można prać w pralce w 60°C. Doskonałe właściwości termoregulacyjne - chłodzi latem, grzeje zimą.'
WHERE name = 'Pościel bawełniana';

-- Zabawki
UPDATE products SET description = 'Kreatywny zestaw klocków konstrukcyjnych zawierający 500 kolorowych elementów w różnych kształtach i rozmiarach. Rozwija wyobraźnię, umiejętności manualne i myślenie przestrzenne. Kompatybilny z innymi markami. Wykonany z bezpiecznego, nietoksycznego plastiku ABS. Dla dzieci od 4 lat. W zestawie instrukcje do budowy 20 różnych modeli. Przechowywane w praktycznym pudełku. Idealny prezent rozwijający kreatywność.'
WHERE name = 'Klocki konstrukcyjne';

UPDATE products SET description = 'Puzzle 1000 elementów przedstawiające przepiękny krajobraz górski ze szczegółową panoramą Alp. Wysokiej jakości karton z matowym wykończeniem, precyzyjne cięcie elementów zapewnia idealne dopasowanie. Wymiary ułożonego puzzla: 68 x 48 cm. Doskonała zabawa dla całej rodziny, świetny sposób na relaks i odprężenie. Dołączona grafika podglądowa. Opakowanie z uchwytem umożliwia łatwe przechowywanie.'
WHERE name = 'Puzzle 1000 elementów';

UPDATE products SET description = 'Uroczy pluszowy miś o wysokości 50 cm wykonany z najwyższej jakości, miękkiego i przytulnego materiału. Bezpieczny dla dzieci - certyfikowane materiały i wykonanie zgodne z normami EU. Wypełnienie z włókna antyalergicznego, można prać w pralce w 30°C. Duże, przyjazne oczy i czarny nosek. Idealny towarzysz do zabawy i zasypiania. Doskonały prezent na każdą okazję dla dzieci w każdym wieku.'
WHERE name = 'Pluszowy miś';
