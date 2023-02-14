import { readFileSync, writeFileSync } from 'fs';
import { RESULTS_FILENAME, WINNERS_FILENAME } from './constants';
import append from './helpers/append';

// Prepare file
writeFileSync(RESULTS_FILENAME, '# Kitsu Anime Awards 2022 Results\n\n');
writeFileSync(WINNERS_FILENAME, '# Kitsu Anime Awards 2022 Winners\n\n');

const file = readFileSync('results-2022.json', { encoding: 'utf-8' });
const data: Data = JSON.parse(file);

const categories = data.data.year[0].categories;

categories.forEach((category) => {
	append(`## ${category.name}`);

	category.subcategories.forEach((subcategory) => {
		append(`### ${subcategory.name}`);

		const totalVotes = subcategory.nominees.reduce((p, c, _) => {
			return {
				name: '',
				judgesResults: 0,
				usersResults: p.usersResults + c.usersResults,
				media: '',
			};
		}).usersResults;

		append(`**Total Votes:** ${totalVotes}`);

		subcategory.nominees.forEach((nominee) => {
			append(
				`**${nominee.name}**\nJudges: ${nominee.judgesResults}\nUsers: ${nominee.usersResults}`
			);
		});
	});
});

categories.forEach((category) => {
	append(`## ${category.name}`, WINNERS_FILENAME);

	category.subcategories.forEach((subcategory) => {
		append(`### ${subcategory.name}`, WINNERS_FILENAME);

		const totalVotes = subcategory.nominees.reduce((p, c, _) => {
			return {
				name: '',
				judgesResults: 0,
				usersResults: p.usersResults + c.usersResults,
				media: '',
			};
		}).usersResults;

		append(`**Total Votes:** ${totalVotes}`, WINNERS_FILENAME);

		const judgesVotes = subcategory.nominees.reduce((p, c, i) =>
			p.judgesResults > c.judgesResults ? p : c
		);
		const judgesResult = subcategory.nominees.filter(
			(nominee) => nominee.judgesResults === judgesVotes.judgesResults
		);

		append('#### Judges Result:', WINNERS_FILENAME);
		judgesResult.forEach((nominee) => {
			append(
				`**${nominee.name}**\nvotes: ${nominee.judgesResults}`,
				WINNERS_FILENAME
			);
		});

		const usersVotes = subcategory.nominees.reduce((p, c, i) =>
			p.usersResults > c.usersResults ? p : c
		);
		const usersResult = subcategory.nominees.filter(
			(nominee) => nominee.usersResults === usersVotes.usersResults
		);

		append('#### Users Result:', WINNERS_FILENAME);
		usersResult.forEach((nominee) => {
			append(
				`**${nominee.name}**\nvotes: ${nominee.usersResults}`,
				WINNERS_FILENAME
			);
		});
	});
});
