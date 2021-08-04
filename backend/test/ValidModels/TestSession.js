module.exports = () =>
{
	return {
		TotalTime: 0,
		TaskOrderName: "Sample",
		Screen: {
			Width: 10,
			Height: 10,
			Dpi: 10
		},
		Demographics: {
			Education: [
				{
					Degree: "PhD",
					Specialty: "Computer Science",
					IsCompleted: true,
					Years: 0
				}
			],
			FieldOfStudy: 1,
			WorkplaceGraphics: {
				Importance: 0,
				Description: ""
			},
			WorkplaceDrawings: {
				Importance: 0,
				Description: ""
			},
			VisualArt: {
				TimeSpent: 0,
				Description: ""
			},
			VideoGames: {
				TimeSpent: 0,
				Description: ""
			},
			Age: 0,
			Gender: "Gender",
			IsWorkplaceDrawingsUsed: true,
		},
		Tests: [
			{
				Type: 0,
				Duration: 0,
				Order: 1,
				UserConfidence: 0,
				TechniquesUsed: "",
				Metadata: {},
				Options: [
					{
						Name: "a",
						SelectedState: 0,
						CorrectState: 0
					}
				],
				Rotations: [
					{
						Id: 0,
						InitialOffset: {
							x: 0,
							y: 0
						},
						Instances: [
							{
								DeltaTime: 0,
								x: 0,
								y: 0
							}
						]
					}
				]
			}
		],
		Compensation: {
			Name: "John Doe",
			Email: "a@gmail.com",
			Country: "Canada"
		}
	};
};