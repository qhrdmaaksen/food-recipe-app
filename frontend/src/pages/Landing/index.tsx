import recipeOne from '../../assets/recipe-one.jpg';
import recipeTwo from '../../assets/images/recipe-two.jpg';
import recipeThree from '../../assets/images/recipe-three.jpg';

export const Landing = () => {
    return (
        <div className="container bg-black text-white h-[100%] flex flex-col-reverse md:flex-row w-full">
            <div className="w-full h-full">

            </div>
            <div className="w-full h-full saturate-200">
                <img
                    src={recipeOne}
                    alt="음식 레시피가 있는 요리"
                    className="w-full h-full object-center object-cover"
                />
            </div>
        </div>
    );
}
