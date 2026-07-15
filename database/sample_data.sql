-- Insert States
INSERT INTO states (id, name) VALUES
(1, 'Delhi'),
(2, 'Maharashtra'),
(3, 'Karnataka'),
(4, 'Tamil Nadu'),
(5, 'West Bengal');

-- Insert Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'Spices & Herbs', 'Aromatic spices and dry herbs for kitchen seasoning'),
(2, 'Grains & Flours', 'Wheat, rice, flours, and other staple grains'),
(3, 'Lentils & Pulses', 'Rich sources of protein, dals and legumes'),
(4, 'Sweeteners & Beverages', 'Sugar, tea, coffee, and other beverage supplies'),
(5, 'Oils & Fats', 'Cooking oils, ghee, and butter staples');

-- Insert Products for Delhi (State 1) - Hindi Translations
INSERT INTO products (name, bilingual_name, price, image_url, state_id, category_id) VALUES
('Turmeric Powder', 'हल्दी पाउडर', 49.00, NULL, 1, 1),
('Red Chili Powder', 'लाल मिर्च पाउडर', 55.00, NULL, 1, 1),
('Cumin Seeds', 'जीरा', 75.00, NULL, 1, 1),
('Coriander Powder', 'धनिया पाउडर', 45.00, NULL, 1, 1),
('Basmati Rice', 'बासमती चावल', 120.00, NULL, 1, 2),
('Wheat Flour (Atta)', 'गेहूं का आटा', 48.00, NULL, 1, 2),
('Semolina (Suji)', 'सूजी', 35.00, NULL, 1, 2),
('Red Lentils (Masoor Dal)', 'मसूर दाल', 95.00, NULL, 1, 3),
('Yellow Split Peas (Toor Dal)', 'अरहर दाल', 140.00, NULL, 1, 3),
('Chickpeas', 'सफेद चना', 110.00, NULL, 1, 3),
('White Sugar', 'सफ़ेद चीनी', 45.00, NULL, 1, 4),
('Green Tea Leaf', 'हरी चाय पत्ती', 180.00, NULL, 1, 4),
('Mustard Oil', 'सरसों का तेल', 165.00, NULL, 1, 5),
('Cow Ghee', 'गाय का घी', 620.00, NULL, 1, 5);

-- Insert Products for Maharashtra (State 2) - Marathi/Hindi Translations
INSERT INTO products (name, bilingual_name, price, image_url, state_id, category_id) VALUES
('Turmeric Powder', 'हळद पावडर', 50.00, NULL, 2, 1),
('Red Chili Powder', 'लाल तिखट', 58.00, NULL, 2, 1),
('Cumin Seeds', 'जिरे', 78.00, NULL, 2, 1),
('Mustard Seeds', 'मोहरी', 42.00, NULL, 2, 1),
('Kolam Rice', 'कोलम तांदूळ', 75.00, NULL, 2, 2),
('Wheat Flour (Atta)', 'गव्हाचे पीठ', 50.00, NULL, 2, 2),
('Yellow Split Peas (Toor Dal)', 'तुरीची डाळ', 145.00, NULL, 2, 3),
('Split Bengal Gram (Chana Dal)', 'हरभरा डाळ', 90.00, NULL, 2, 3),
('Jaggery Powder', 'गुळ पावडर', 65.00, NULL, 2, 4),
('Filter Coffee', 'फिल्टर कॉफी', 150.00, NULL, 2, 4),
('Groundnut Oil', 'शेंगदाणा तेल', 190.00, NULL, 2, 5),
('Cow Ghee', 'गायीचे तूप', 630.00, NULL, 2, 5);

-- Insert Products for Karnataka (State 3) - Kannada Translations
INSERT INTO products (name, bilingual_name, price, image_url, state_id, category_id) VALUES
('Turmeric Powder', 'ಅರಿಶಿನ ಪುಡಿ', 52.00, NULL, 3, 1),
('Red Chili Powder', 'ಖಾರದ ಪುಡಿ', 60.00, NULL, 3, 1),
('Cumin Seeds', 'ಜೀರಿಗೆ', 80.00, NULL, 3, 1),
('Mustard Seeds', 'ಸಾಸಿವೆ', 44.00, NULL, 3, 1),
('Sona Masuri Rice', 'ಸೋನಾ ಮಸೂರಿ ಅಕ್ಕಿ', 65.00, NULL, 3, 2),
('Ragi Flour', 'ರಾಗಿ ಹಿಟ್ಟು', 42.00, NULL, 3, 2),
('Yellow Split Peas (Toor Dal)', 'ತೊಗರಿ ಬೇಳೆ', 148.00, NULL, 3, 3),
('Black Gram (Urad Dal)', 'ಉದ್ದಿನ ಬೇಳೆ', 130.00, NULL, 3, 3),
('Jaggery Powder', 'ಬೆಲ್ಲದ ಪುಡಿ', 68.00, NULL, 3, 4),
('Filter Coffee Powder', 'ಫಿಲ್ಟರ್ ಕಾಫಿ ಪುಡಿ', 160.00, NULL, 3, 4),
('Coconut Oil', 'ತೆಂಗಿನ ಎಣ್ಣೆ', 210.00, NULL, 3, 5),
('Pure Ghee', 'ಶುದ್ಧ ತುಪ್ಪ', 650.00, NULL, 3, 5);

-- Insert Products for Tamil Nadu (State 4) - Tamil Translations
INSERT INTO products (name, bilingual_name, price, image_url, state_id, category_id) VALUES
('Turmeric Powder', 'மஞ்சள் தூள்', 52.00, NULL, 4, 1),
('Red Chili Powder', 'மிளகாய் தூள்', 60.00, NULL, 4, 1),
('Cumin Seeds', 'சீரகம்', 82.00, NULL, 4, 1),
('Mustard Seeds', 'கடுகு', 45.00, NULL, 4, 1),
('Ponni Rice', 'பொன்னி அரிசி', 70.00, NULL, 4, 2),
('Rice Flour', 'அரிசி மாவு', 40.00, NULL, 4, 2),
('Yellow Split Peas (Toor Dal)', 'துவரம் பருப்பு', 150.00, NULL, 4, 3),
('Black Gram (Urad Dal)', 'உளுத்தம் பருப்பு', 135.00, NULL, 4, 3),
('White Sugar', 'சர்க்கரை', 46.00, NULL, 4, 4),
('Filter Coffee Powder', 'காபி தூள்', 165.00, NULL, 4, 4),
('Sesame/Gingelly Oil', 'நல்லெண்ணெய்', 240.00, NULL, 4, 5),
('Pure Ghee', 'நெய்', 660.00, NULL, 4, 5);

-- Insert Products for West Bengal (State 5) - Bengali Translations
INSERT INTO products (name, bilingual_name, price, image_url, state_id, category_id) VALUES
('Turmeric Powder', 'হলুদ গুঁড়ো', 50.00, NULL, 5, 1),
('Red Chili Powder', 'লঙ্কা গুঁড়ো', 58.00, NULL, 5, 1),
('Cumin Seeds', 'জিরে', 78.00, NULL, 5, 1),
('Five Spices (Panch Phoron)', 'পাঁচ ফোড়ন', 65.00, NULL, 5, 1),
('Miniket Rice', 'মিনিকেট চাল', 68.00, NULL, 5, 2),
('Wheat Flour (Maida)', 'ময়দা', 45.00, NULL, 5, 2),
('Red Lentils (Masoor Dal)', 'মসুর ডাল', 98.00, NULL, 5, 3),
('Split Bengal Gram (Chana Dal)', 'ছোলার ডাল', 92.00, NULL, 5, 3),
('Sugar', 'চিনি', 45.00, NULL, 5, 4),
('Darjeeling Tea Leaves', 'দার্জিলিং চা পাতা', 220.00, NULL, 5, 4),
('Mustard Oil', 'সর্ষের তেল', 170.00, NULL, 5, 5),
('Cow Ghee', 'গাওয়া ঘি', 680.00, NULL, 5, 5);
