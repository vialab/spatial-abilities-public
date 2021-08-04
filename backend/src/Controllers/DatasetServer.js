let {constants: fsConstants} = require("fs");
let fsp = require("fs.promises");
let Config = require("../../config.json");
let Path = require("path");

module.exports = {
	GetFile
}

async function GetFile(req, res, next)
{
	let directory = req.params.folder;
	let file = req.params.file;
	let path = Path.join(Config.DatasetDirectory, directory, `${file}.csv`);

	let dataset = {
		Dimension: 0,
		Data: []
	};
	
	try
	{
		let fileExists = await fsp.access(path, fsConstants.R_OK);
		let fileContents = await fsp.readFile(path, "utf8");
		let reader = new LineReader(fileContents);
		
		for (let line = reader.NextLine(); line != null; line = reader.NextLine())
		{
			let values = line.split(",");
			dataset.Dimension = values.length;

			for (let i = 0; i < dataset.Dimension; i++)
			{
				dataset.Data.push(Number.parseFloat(values[i]));
			}
		}

		res.send(dataset);
	}
	catch (err)
	{
		return res.status(400).send({error: "File not found"});
	}
}

class LineReader
{
	constructor(string)
	{
		this.string = string;
		this.currentIndex = 0;
	}

	NextLine()
	{
		let line  = "";

		for (; this.currentIndex < this.string.length; this.currentIndex++)
		{
			let character = this.string.charAt(this.currentIndex);
			
			if (character == "\n")
			{
				this.currentIndex++;
				break;
			}

			line += character;
		}

		line = line.trim();

		return line.length? line : null;
	}
}