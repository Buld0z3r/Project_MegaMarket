/*
  # Aktualizacja zdjęć i opisów kolejnych produktów

  1. Zmiany
    - Aktualizacja ścieżek do zdjęć produktów na lokalne pliki z folderu public
    - Powieść kryminalna "Podszept" -> /pow_kryminalna.jpg
    - Butelka sportowa czarna -> /Butelka_sportowa_GRANDE_1000ml_14049_czarny.jpg
    - Bluza The North Face -> /pol_pm_Bluza-z-kapturem-meska-The-North-Face-DREW-PEAK-PULLOVER-czarna-NF0A89EMJK3-28563_1.jpg
    - Jeansy ciemne -> /jeans.jpg
    - T-shirt z nadrukiem -> /tshirt_czarny_wlasny_nadruk_zloty.png
  
  2. Aktualizacja opisów produktów
    - Zaktualizowane opisy dla lepszego dopasowania do nowych zdjęć produktów
*/

-- Aktualizacja Powieści kryminalnej
UPDATE product_images 
SET image_url = '/pow_kryminalna.jpg'
WHERE product_id = '4e874808-6424-4e73-98e8-8a303df5467f';

UPDATE products
SET name = 'Podszept - Jacek Łukawski',
    description = 'Bestseller kryminalny "Podszept" autorstwa Jacka Łukawskiego. Wciągająca historia pełna mrocznych tajemnic i nieoczekiwanych zwrotów akcji. Opowieść o poszukiwaniach prawdy, która prowadzi bohaterów przez mroczne lasy i tajemnicze miejsca. Mistrzostwo w budowaniu napięcia i atmosfery grozy. Twarda oprawa, 384 strony. Idealna dla fanów thrillerów psychologicznych i polskiej literatury kryminalnej.',
    price = 44.99
WHERE id = '4e874808-6424-4e73-98e8-8a303df5467f';

-- Aktualizacja Butelki sportowej
UPDATE product_images 
SET image_url = '/Butelka_sportowa_GRANDE_1000ml_14049_czarny.jpg'
WHERE product_id = '26d5c0c5-d4ff-4e9d-a38d-3218362ed46a';

UPDATE products
SET name = 'Butelka sportowa Grande 1000ml - czarna',
    description = 'Stylowa czarna butelka sportowa Grande o pojemności 1000ml z praktycznym systemem otwierania jedną ręką. Wykonana z wysokiej jakości tritanu BPA-free. Szczelna zakrętka z ergonomicznym uchwytem, wyraźna skala pojemności na boku. Wąska konstrukcja pasuje do standardowych uchwytów rowerowych i samochodowych. Łatwa w czyszczeniu, można myć w zmywarce. Elegancki czarny design z kontrastowym logo SPORT. Idealna na siłownię, rower i treningi.',
    price = 34.99
WHERE id = '26d5c0c5-d4ff-4e9d-a38d-3218362ed46a';

-- Aktualizacja Bluzy z kapturem
UPDATE product_images 
SET image_url = '/pol_pm_Bluza-z-kapturem-meska-The-North-Face-DREW-PEAK-PULLOVER-czarna-NF0A89EMJK3-28563_1.jpg'
WHERE product_id = 'a795d35e-e47b-4b24-a0f4-45da25bad7df';

UPDATE products
SET name = 'Bluza The North Face Drew Peak Pullover - czarna',
    description = 'Kultowa męska bluza z kapturem The North Face Drew Peak Pullover w kolorze czarnym. Wykonana z miękkiej mieszanki bawełny i poliestru zapewniającej komfort i trwałość. Charakterystyczne szare logo The North Face z przodu. Praktyczna kieszeń typu kangurka, regulowany kaptur ze sznurkiem. Rękawy zakończone ściągaczami, klasyczny krój. Idealny wybór na co dzień i na lekkie wędrówki. Ikona stylu outdoor.',
    price = 349.99
WHERE id = 'a795d35e-e47b-4b24-a0f4-45da25bad7df';

-- Aktualizacja Jeansów
UPDATE product_images 
SET image_url = '/jeans.jpg'
WHERE product_id = '309ffad6-9c88-4570-8bd5-22c8daf209d5';

UPDATE products
SET name = 'Jeansy męskie slim fit - ciemny denim',
    description = 'Klasyczne męskie jeansy slim fit w kolorze ciemnego denimu. Wykonane z wysokiej jakości bawełny z elastanem dla maksymalnego komfortu noszenia. Wyraziste pomarańczowe przeszycia i skórzany patch na tylnej stronie. Krój slim fit perfekcyjnie dopasowuje się do sylwetki. 5-kieszeniowy design, zapinane na guzik. Wytrzymały denim odporny na pranie. Uniwersalny styl pasujący do każdej stylizacji. Skład: 98% bawełna, 2% elastan.',
    price = 179.99
WHERE id = '309ffad6-9c88-4570-8bd5-22c8daf209d5';

-- Aktualizacja T-shirta
UPDATE product_images 
SET image_url = '/tshirt_czarny_wlasny_nadruk_zloty.png'
WHERE product_id = '1fca3635-65f5-4597-97d7-af3deb888057';

UPDATE products
SET name = 'T-shirt z własnym nadrukiem - czarny ze złotym napisem',
    description = 'Czarny t-shirt premium z możliwością personalizacji złotym nadrukiem. Na zdjęciu przykładowy napis "TWÓJ NADRUK ZŁOTY" wykonany wysokiej jakości folią termotransferową w kolorze złotym. Wykonany w 100% z bawełny organicznej o gramaturze 180g/m². Miękki, przewiewny materiał idealny na każdą porę roku. Trwały nadruk odporny na pranie. Idealny na prezent lub dla siebie. Rozmiary od S do XXL. Certyfikat OEKO-TEX.',
    price = 69.99
WHERE id = '1fca3635-65f5-4597-97d7-af3deb888057';
