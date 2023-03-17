import {Schema, SchemaTypes, model} from 'mongoose';

// IImage type 정의
interface IImage {
	url: string,
	id: string,

}

// 1. MongoDB 에서 문서를 나타내는 인터페이스를 생성
interface IRecipe {
	title: string,
	note?: string,
	description: string,
	ingredients: string,
	image: IImage;
	user?: string;
}

// 2. 문서 인터페이스에 해당하는 스키마를 생성
const recipeSchema = new Schema<IRecipe>(
		{
			/*user 필드에는 User 모델의 ObjectId 가 들어갈 수 있도록 설정
			* 사용자를 사용자라고 부르지만 실제로 저장하는것은 사용자 ID 임
			* 레시피와 함께 id 를 저장하므로 따로 아이디가 없고 오브젝트 아이디가 참조 역할을 함*/
			user: { type: SchemaTypes.ObjectId, ref: "User" },
			// 4. title, description, ingredients 필드는 필수값이므로 required: true 설정
			title: { type: String, required: true, index: true },
			description: { type: String, required: true, index: true },

			note: { type: String, index: true },
			ingredients: { type: String, required: true, index: true },
			image: {
				url: { type: String, required: true },
				id: { type: String, required: true },
			},
		},
		{
			timestamps: true, // createdAt, updatedAt 필드를 자동으로 생성
			autoIndex: true, // 스키마가 컴파일되면 자동으로 인덱스를 생성
			// toJSON, toObject 옵션은 스키마를 JSON 으로 변환할 때 어떤 값들을 포함할지 설정
			toJSON: { virtuals: true },
			// virtuals 옵션을 true 로 설정하면 toJSON, toObject 옵션에 따라 가상 필드가 포함됨
			toObject: { virtuals: true },
		}
);

/*Recipe 모델 생성 후 내보냄
* 몽구스 몽고 디비에게 레시피 스키마를 전달*/
export const Recipe = model<IRecipe>("Recipe", recipeSchema);