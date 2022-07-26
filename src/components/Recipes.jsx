import { useState } from 'react';


const indexVars = {
    hight: 129,
    width: 456
}

const extendindexVars = {
    ...indexVars,
    color: 'red',
    size: 'small'
}

console.log(indexVars);
console.log(extendindexVars);

const Recipes = () => {
    const [recipe, setRecipe] = useState([]);
    return ( 
        <>
            <div>
                <h3>Current Recipe</h3>
                <button onClick={()=> setRecipe(indexVars)}>Get indexVars</button>
                <button onClick={()=> setRecipe(extendindexVars)}>Get extendindexVars</button>
            </div>

            <ul>
                {Object.keys(recipe).map((material)=>(
                    <li key={material}>
                        {material}: {recipe[material]}
                    </li>

                ))}


                
            </ul>
        </>
     );
}
 
export default Recipes;