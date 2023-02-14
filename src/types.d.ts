interface Data {
	data: {
		year: Year[];
	};
}

interface Year {
	categories: Category[];
}

interface Category {
	name: string;
	subcategories: Subcategory[];
}

interface Subcategory {
	name: string;
	nominees: Nominee[];
}

interface Nominee {
	name: string;
	judgesResults: number;
	usersResults: number;
	media: string;
}
