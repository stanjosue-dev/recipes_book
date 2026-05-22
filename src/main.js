const buttonAdd = document.querySelector('.add-recipe');
const recipeList = document.querySelector('.list');
const recipeView = document.querySelector('.view-recipes');
let recipe = null;
let storage = JSON.parse(localStorage.getItem('storage')) || [];


class Form {
  constructor(nom,ingredients,etapes,url,id){
    this.nom = nom ;
    this.ingredients = ingredients ;
    this.etapes = etapes ;
    this.url = url ; 
    this.id = id ;
  }
};


// PREVIEW FOR TEST AND ISUALIZE.
const preview = {
  nom: "Crêpes fait maison ",
  ingredients: "250 g de farine tout usage3 œufs frais500 ml de lait demi-écrémé (ou entier)2 cuillères à soupe de beurre fondu (ou d'huile de tournesol)1 pincée de sel",
  etapes: "1. Préparer la base sècheVersez la farine, le sel (et le sucre si vous faites des crêpes sucrées) dans un grand saladier. Formez un puits au centre avec votre cuillère.2. Incorporer les œufsCassez les œufs au centre du puits. Commencez à mélanger doucement à l'aide d'un fouet en partant du milieu. La farine va s'incorporer petit à petit.3. Ajouter les liquidesVersez le lait très progressivement (en 3 ou 4 fois) tout en fouettant énergiquement. Cette technique simple permet de décoller la farine en douceur et évite totalement la formation de grumeaux. Ajoutez enfin le beurre fondu et mélangez une dernière fois.4. Cuire les crêpesFaites chauffer une poêle antiadhésive à feu moyen et graissez-la légèrement avec un essuie-tout imbibé d'huile. Versez une louche de pâte tout en faisant pivoter la poêle pour bien répartir la pâte en une couche fine. Laissez cuire environ 1 minute jusqu'à ce que les bords se décollent, retournez la crêpe avec une spatule, puis laissez cuire l'autre face pendant 30 secondes",
  url: "https://lacuisinedegeraldine.fr/wp-content/uploads/2025/01/Pate-a-crepes-recette-de-base-143-683x1024.jpg.webp",
  id: 1234
};
storage.push(preview);


function addRecipes() {
  let nom = document.querySelector('.nom').value.trim();
  let ingredients = document.querySelector('.ingredients').value;
  let etapes = document.querySelector('.recipe').value;
  let url = document.querySelector('.url').value.trim();
  let id = Date.now();

  recipe = new Form(nom,ingredients,etapes,url,id);
  storage.push(recipe);
  save();
  alert('Recette ajouté !');
};

function listRecipes() {

  recipeList.innerHTML = ``;
storage.forEach((recipe) =>{
  recipeList.innerHTML += `
  <div class="recipes">
    <div class="col">
      <img src=${recipe.url}>
      <div>
        <p><b>${recipe.nom}</b></p>
        <p><i>ingrédients : </i>${recipe.ingredients}</p>
      </div>
      <button class="btn-display" data-id=${recipe.id}>Voir toute la Recette</button>
      <button class="btn-edit" data-id=${recipe.id}>Modifier</button>
      <button class="btn-delete" data-id=${recipe.id}>Supprimer</button>
    </div>
    </div>
  `
})

document.querySelectorAll('.btn-display').forEach(button =>{
    button.addEventListener('click', ()=>{
      let id = button.dataset.id;
      displayRecipe(id)
    });
});

document.querySelectorAll('.btn-edit').forEach(button =>{
    button.addEventListener('click', ()=>{
      let id = button.dataset.id;
      editRecipes(id)
    });
});

document.querySelectorAll('.btn-delete').forEach(button =>{
    button.addEventListener('click', ()=>{
      let id = button.dataset.id;
      deleteRecipe(id)
    });
});

};

function displayRecipe(id) {
  const tempStorage = storage.filter(recipe => recipe.id == id);

  tempStorage.forEach(recipe => {
    recipeView.innerHTML = `
  <p><b>${recipe.etapes}</b></p>
  `
  })
};

function editRecipes(id){
  let newName = prompt('Entrez un nouveau nom pour votre recette :').trim();
  let newIngredients = prompt('les nouveaux ingredients :');
  let newEtapes = prompt('les nouvelles etapes :');


  storage.forEach(recipe => {
    if (recipe.id == id){
      recipe.nom = newName;
      recipe.ingredients = newIngredients;
      recipe.etapes = newEtapes;
      save();
    }
  })
};

function deleteRecipe(id){
  storage = storage.filter(recipe => recipe.id != id);
  save()
};

function save(){
localStorage.setItem('storage',JSON.stringify(storage));
listRecipes();
};

//* function searchRecipe(){}; *// TO DO LATER


// EVENTS

buttonAdd.addEventListener('click',()=>{
  addRecipes() ;
});

listRecipes();
