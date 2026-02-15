/*
  # Aktualizacja zdjęć produktów na lokalne pliki

  1. Zmiany
    - Aktualizacja ścieży do zdjęć produktów na lokalne pliki z folderu public
    - Pluszowy miś -> /pluszowy_mis.jpg
    - Sokowirówka -> /sokowirowka.jpg
    - Drewniane klocki konstrukcyjne -> /drewniane-klocki-konstrukcyjne-250-sztuk.jpg
    - Pościel bawełniana -> /posciel.jpg
    - Puzzle Wiedźmin -> /Puzzle-CENEGA-Wiedzmin-Geralt-Ciri-1000-elementow-front.jpg
  
  2. Aktualizacja opisów produktów
    - Zaktualizowane opisy dla lepszego dopasowania do nowych zdjęć
*/

-- Aktualizacja Pluszowego misia
UPDATE product_images 
SET image_url = '/pluszowy_mis.jpg'
WHERE product_id = '65b031f5-7d73-4887-b55a-515e6b36eee0';

UPDATE products
SET description = 'Gigantyczny pluszowy miś o wysokości 120 cm - idealny towarzysz do przytulania! Wykonany z najwyższej jakości, niezwykle miękkiego i przytulnego materiału. Bezpieczny dla dzieci - certyfikowane materiały zgodne z normami EU. Wypełnienie z włókna antyalergicznego. Duże, przyjazne oczy i czarny nosek tworzą uroczą buzię. Idealny na prezent, dekorację pokoju lub do robienia zdjęć. Doskonały towarzysz dla dzieci i dorosłych.',
    price = 299.99
WHERE id = '65b031f5-7d73-4887-b55a-515e6b36eee0';

-- Aktualizacja Sokowirówki
UPDATE product_images 
SET image_url = '/sokowirowka.jpg'
WHERE product_id = '918012ed-6d68-444e-9bd7-a9de226bca94';

UPDATE products
SET name = 'Sokowirówka elektryczna',
    description = 'Wydajna sokowirówka elektryczna o mocy 800W z szerokim wlotem 75mm. Stalowe sitko i ostrza zapewniają efektywne wyciskanie soku z twardych owoców i warzyw. Pojemnik na sok 1L i na miąższ 2L. System kropla-stop, nóżki antypoślizgowe. Wszystkie wyjmowane części można myć w zmywarce. Kompaktowa konstrukcja, elegancki design. 2 prędkości pracy dostosowane do różnych rodzajów produktów. Idealny do przygotowania świeżych, zdrowych soków.',
    price = 249.99
WHERE id = '918012ed-6d68-444e-9bd7-a9de226bca94';

-- Aktualizacja Klocków konstrukcyjnych
UPDATE product_images 
SET image_url = '/drewniane-klocki-konstrukcyjne-250-sztuk.jpg'
WHERE product_id = 'aab17f1c-ca80-4dc0-b98a-193fcd3d0390';

UPDATE products
SET name = 'Drewniane klocki konstrukcyjne - 250 sztuk',
    description = 'Kolorowy zestaw drewnianych klocków konstrukcyjnych zawierający 250 elementów w różnych kształtach, rozmiarach i kolorach. Wykonane z naturalnego, ekologicznego drewna, bezpieczne dla dzieci. Rozwijają wyobraźnię, koordynację wzrokowo-ruchową i zdolności inżynieryjne. Klocki o różnych kształtach umożliwiają budowę domków, wież, mostów i wielu innych konstrukcji. Dla dzieci od 3 lat. Przechowywane w praktycznym drewnianym pudełku.',
    price = 179.99
WHERE id = 'aab17f1c-ca80-4dc0-b98a-193fcd3d0390';

-- Aktualizacja Pościeli
UPDATE product_images 
SET image_url = '/posciel.jpg'
WHERE product_id = '9cfda61a-8b5c-4fea-a148-ba073f29c7a3';

UPDATE products
SET name = 'Pościel bawełniana we wzory',
    description = 'Modna pościel bawełniana 160x200 cm z kolorowymi, geometrycznymi wzorami. Wykonana z wysokiej jakości bawełny o gęstości 200TC. Żywe, soczyste kolory w odcieniach zieleni, niebieskiego i czarnego tworzą nowoczesny, designerski wzór. W zestawie: poszwa na kołdrę 160x200 cm i poszewka na poduszkę 70x80 cm. Można prać w pralce w 60°C. Trwałe kolory odporne na pranie. Idealna do nowoczesnych wnętrz.',
    price = 129.99
WHERE id = '9cfda61a-8b5c-4fea-a148-ba073f29c7a3';

-- Aktualizacja Puzzli
UPDATE product_images 
SET image_url = '/Puzzle-CENEGA-Wiedzmin-Geralt-Ciri-1000-elementow-front.jpg'
WHERE product_id = '9d8a6bc9-d400-4e58-a55e-8bba0e315b27';

UPDATE products
SET name = 'Puzzle Wiedźmin - Geralt i Ciri - 1000 elementów',
    description = 'Oficjalne puzzle 1000 elementów z motywem Wiedźmina przedstawiające Geralta i Ciri. Licencjonowany produkt CD Projekt Red. Wysokiej jakości karton z matowym wykończeniem, precyzyjne cięcie gwarantuje idealne dopasowanie elementów. Wymiary ułożonego puzzla: 68 x 48 cm. Epicka grafika idealna dla fanów serii. Doskonały prezent dla miłośników gier i fantasy. Pudełko z uchwytem ułatwia przechowywanie.',
    price = 79.99
WHERE id = '9d8a6bc9-d400-4e58-a55e-8bba0e315b27';
