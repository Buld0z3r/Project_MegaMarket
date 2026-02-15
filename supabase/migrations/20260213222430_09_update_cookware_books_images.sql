/*
  # Aktualizacja zdjęć i opisów - garnki i książki

  1. Zmiany
    - Aktualizacja ścieżek do zdjęć produktów na lokalne pliki z folderu public
    - Zestaw garnków -> /zestaw-garnkow.jpg
    - Książka kulinarna -> /ks_kulinarna.jpg
    - Poradnik psychologiczny -> /por_psycholo.jpg
  
  2. Aktualizacja opisów produktów
    - Zaktualizowane opisy dla lepszego dopasowania do rzeczywistych produktów
*/

-- Aktualizacja Zestawu garnków
UPDATE product_images 
SET image_url = '/zestaw-garnkow.jpg'
WHERE product_id = '13252f8e-b49e-4a8e-8723-ca6e3b349c72';

UPDATE products
SET name = 'Zestaw garnków 10-elementowy z powłoką marmurową',
    description = 'Elegancki 10-elementowy zestaw garnków w kolorze różowego złota z marmurową powłoką nieprzyzwalną. W zestawie: 3 garnki o różnych pojemnościach z pokrywkami szklanymi, patelnia kwadratowa z pokrywką, patelnia okrągła oraz 2 podstawki pod gorące naczynia. Powłoka marmurowa zapewnia doskonałe właściwości nieprzywierające i łatwość czyszczenia. Miedziane uchwyty pozostają chłodne podczas gotowania. Nadają się do wszystkich rodzajów kuchenek włącznie z indukcją. Nowoczesny design idealnie komponuje się z każdą kuchnią.',
    price = 449.99
WHERE id = '13252f8e-b49e-4a8e-8723-ca6e3b349c72';

-- Aktualizacja Książki kulinarnej
UPDATE product_images 
SET image_url = '/ks_kulinarna.jpg'
WHERE product_id = 'bf2f111e-8bcc-42a3-ad19-3dfd01167cca';

UPDATE products
SET name = 'Zwykła książka kucharska - Anna Karasińska',
    description = 'Bestseller kulinarny "Zwykła książka kucharska" autorstwa Anny Karasińskiej, wydawnictwo HAM. Zawiera sprawdzone, domowe przepisy na tradycyjne polskie dania oraz nowoczesne interpretacje klasycznych potraw. Przepisy krok po kroku, pięknie ilustrowane zdjęciami gotowych dań. Ponad 150 przepisów na zupy, dania główne, desery i przekąski. Twarda oprawa z estetyczną szatą graficzną w stylu vintage. Idealna dla osób, które chcą gotować smacznie i bez zbędnych komplikacji. Doskonały prezent dla miłośników domowej kuchni.',
    price = 69.99
WHERE id = 'bf2f111e-8bcc-42a3-ad19-3dfd01167cca';

-- Aktualizacja Poradnika psychologicznego
UPDATE product_images 
SET image_url = '/por_psycholo.jpg'
WHERE product_id = 'bcc14bfa-76b9-4b97-baf3-a44deb4fc4d7';

UPDATE products
SET name = 'Polityka - Poradnik Psychologiczny: Ja i my, mózg, oni',
    description = 'Numer specjalny czasopisma Polityka - kompleksowy poradnik psychologiczny "Jak i po co podglądamy mózg". Fascynujące artykuły o neuronaukach, mechanizmach działania ludzkiego mózgu i psychologii społecznej. Dowiedz się, jak działa pamięć, emocje, świadomość i podświadomość. Artykuły napisane przez ekspertów w przystępny sposób. Bogato ilustrowany, 96 stron pełnych wartościowej wiedzy. Idealna lektura dla osób zainteresowanych psychologią, naukami o mózgu i zrozumieniem siebie.',
    price = 24.99
WHERE id = 'bcc14bfa-76b9-4b97-baf3-a44deb4fc4d7';
