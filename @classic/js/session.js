// JavaScript Document
var session_id= '';
var name_id= '';
var firebase_uid= "";

function session_start()
{
  function pad(n) {
    return n<10 ? "0"+n : n;
  }
  
  var cookie= document.cookie;
  var d = new Date();
  var mostFirstName= ["Aaron", "Abigail", "Adam", "Alan", "Albert", "Alexander", "Alexis", "Alice", "Amanda", "Amber", 
                      "Amy", "Andrea", "Andrew", "Angela", "Ann", "Anna", "Anthony", "Arthur", "Ashley", "Austin", 
                      "Barbara", "Benjamin", "Betty", "Beverly", "Billy", "Bobby", "Bradley", "Brandon", "Brenda", "Brian", 
                      "Brittany", "Bruce", "Bryan", "Carl", "Carol", "Carolyn", "Catherine", "Charles", "Charlotte", "Cheryl", 
                      "Christian", "Christina", "Christine", "Christopher", "Cynthia", "Daniel", "Danielle", "David", "Deborah", "Debra", 
                      "Denise", "Dennis", "Diana", "Diane", "Donald", "Donna", "Doris", "Dorothy", "Douglas", "Dylan", 
                      "Edward", "Elizabeth", "Emily", "Emma", "Eric", "Ethan", "Eugene", "Evelyn", "Frances", "Frank", 
                      "Gabriel", "Gary", "George", "Gerald", "Gloria", "Grace", "Gregory", "Hannah", "Harold", "Heather", 
                      "Helen", "Henry", "Isabella", "Jack", "Jacob", "Jacqueline", "James", "Janet", "Janice", "Jason", 
                      "Jean", "Jeffrey", "Jennifer", "Jeremy", "Jerry", "Jesse", "Jessica", "Joan", "Joe", "John", 
                      "Johnny", "Jonathan", "Jordan", "Jose", "Joseph", "Joshua", "Joyce", "Juan", "Judith", "Judy", 
                      "Julia", "Julie", "Justin", "Karen", "Katherine", "Kathleen", "Kathryn", "Kayla", "Keith", 
                      "Kelly", "Kenneth", "Kevin", "Kimberly", "Kyle", "Larry", "Laura", "Lauren", "Lawrence", "Linda", 
                      "Lisa", "Logan", "Louis", "Madison", "Margaret", "Maria", "Marie", "Marilyn", "Mark", "Martha", 
                      "Mary", "Matthew", "Megan", "Melissa", "Michael", "Michelle", "Nancy", "Natalie", "Nathan", "Nicholas", 
                      "Nicole", "Noah", "Olivia", "Pamela", "Patricia", "Patrick", "Paul", "Peter", "Philip", "Rachel", 
                      "Ralph", "Randy", "Raymond", "Rebecca", "Richard", "Robert", "Roger", "Ronald", "Rose", "Roy", 
                      "Russell", "Ruth", "Ryan", "Samantha", "Samuel", "Sandra", "Sara", "Sarah", "Scott", "Sean", 
                      "Sharon", "Shirley", "Sophia", "Stephanie", "Stephen", "Steven", "Susan", "Teresa", "Terry", "Theresa", 
                      "Thomas", "Timothy", "Tyler", "Victoria", "Vincent", "Virginia", "Walter", "Wayne", "William", "Willie", "Zachary",
                      "Mohamed", "Youssef", "Ahmed", "Mahmoud", "Mustafa", "Yassin", "Taha", "Khaled", "Hamza", "Bilal", 
                      "Ibrahim", "Hassan", "Hussein", "Karim", "Tareq", "Abdel", "Rahman", "Ali", "Omar", "Halim", 
                      "Murad", "Selim", "Abdallah", "Peter", "Pierre", "George", "John", "Mina", "Beshoi", "Kirollos", 
                      "Mark", "Fadi", "Habib", "Paulos", "Petros", "Gabreal", "Giorgis", "Yonas", "Yonathan", "Abraham", 
                      "Ammanuel", "Markos", "Michael", "Nahom", "Shaimaa", "Fatma", "Maha", "Reem", "Farida", "Aya", 
                      "Shahd", "Ashraqat", "Sahar", "Fatin", "Dalal", "Doha", "Fajr", "Suha", "Rowan", "Hosniya", 
                      "Hasnaa", "Hosna", "Gamila", "Gamalat", "Habiba", "Mary", "Marie", "Mariam", "Marina", "Irene", 
                      "Malak", "Habiba", "Hana", "Farah", "Marwa", "Nada", "Salma", "Mariamawit", "Ruth", "Mariam", 
                      "Helen", "Christina", "Hanna", "Naomie", "Martha", "Meron", "Lidya", "Eden"];
  var mostLastName= ["Adams", "Allen", "Anderson", "Baker", "Brown", "Campbell", "Carter", "Clark", "Davis", "Flores", 
                     "Garcia", "Gonzalez", "Green", "Hall", "Harris", "Hernandez", "Hill", "Jackson", "Johnson", "Jones", 
                     "King", "Lee", "Lewis", "Lopez", "Martin", "Martinez", "Miller", "Mitchell", "Moore", "Nelson", 
                     "Nguyen", "Perez", "Ramirez", "Rivera", "Roberts", "Robinson", "Rodriguez", "Sanchez", "Scott", "Smith", 
                     "Taylor", "Thomas", "Thompson", "Torres", "Walker", "White", "Williams", "Wilson", "Wright", "Young"];

  if (typeof(cookie)!= "undefined")
  {
    SID= cookie.split('SID=');
    if (SID.length>= 2)
        session_id= SID[1].split(';')[0];
    NID= cookie.split('NID=');
    if (NID.length>= 2)
        name_id= NID[1].split(';')[0];
  }
  if (session_id == '')
  {
    session_id= '';
    session_id+= pad(d.getUTCMonth()+1)+ pad(d.getUTCDate())+ pad(d.getUTCHours());
    session_id+= Date.now().toString(16).substr(4, 6);
    session_id+= Math.random().toString(16).substr(2, 8);
  }
  
  if (name_id == '')
  {
    name_id= mostFirstName[Math.floor(Math.random() * mostFirstName.length)];
    name_id+= '_';
    name_id+= mostLastName[Math.floor(Math.random() * mostLastName.length)];    
  }

  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
  document.cookie= "SID=" + session_id + ";expires=" + d.toUTCString() + ";path=/";
  document.cookie= "NID=" + name_id+ ";expires=" + d.toUTCString() + ";path=/";
}

session_start();
