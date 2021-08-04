import { Task } from "../taskBase";
import { ResultLog } from "../metrics/ResultLog";
import { TaskDisplay, UserInterface } from "../io";
import { EmptyTaskcontroller } from "../taskBase/EmptyTaskController";

export class ConsentForm extends Task
{
	constructor()
	{
		super(new ConsentFormView(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
		this.SetTitle("Consent Form to Participate in a Research Study");
		this.OverrideIntermediateScreen = true;
	}

	public Submit(): void
	{
		this.Controller.Submit([]);
	}

	public LogResults(log: ResultLog): void
	{
		throw new Error("Method not implemented.");
	}
	
}

export class ConsentFormView extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		let SubmitButton = screen.SubmitButton();
		SubmitButton.prop("disabled", true);
		SubmitButton.html("Begin");

		let form = $(consentFormTemplate);
		let consentBox = form.find("#consent");
		consentBox.click(function ()
		{
			let checked = $(this).is(':checked');
			SubmitButton.prop("disabled", !checked);
		});

		screen.ContentContainer().append(form);
		screen.ViewModeContent();
	}
}

let consentFormTemplate = `
<div style="width: 90%; max-height: 100%; overflow: scroll; overflow-x: auto;">
<!-- <div class="w3-panel w3-yellow" style="text-align: center">
	<h2>Thank you for your interest in this study. We have reached our target participation and the study is now closed.</h2>
</div> --> 

<p>
	<b>Title of Research Study:</b> Spatial Abilities and Visualization Task Performance
</p>
<p>
	<b>Name of Principal Investigator (PI): </b> Christopher Collins
</p>
<p>
	<b>PI’s contact number(s)/email(s): </b> 905-721-8668 ext. 6581, Christopher.Collins@ontariotechu.ca
</p>
<p>
	<b>Names of Co-Investigators and contact numbers/emails:</b><br />
	Anastasia Bezerianos, Anastasia.Bezerianos@lri.fr<br />
	Kyle Hall, hallkw@ucalgary.ca<br />
	Anthony Kouroupis, anthony.kouroupis@ontariotechu.net<br />
	Danielle Szafir, Danielle.Szafir@Colorado.EDU<br />
	
</p>
<p>
	<b>Departmental and institutional affiliation(s): </b><br />
	Computer Science, Ontario Tech University
</p>
<p>
	<b>External Funder/Sponsor: </b> NSERC
</p>

<p>
	<b><u>Introduction</u></b>
</p>
<p>
	You are invited to participate in a research study entitled Spatial Abilities and Visualization Task Performance. You are being asked to take part in a research study. Please read the information about the study presented in this form. The form includes details on study’s procedures, risks and benefits that you should know before you decide if you would like to take part. You should take as much time as you need to make your decision. You should ask the Principal Investigator (PI) or study team to explain anything that you do not understand and make sure that all of your questions have been answered before signing this consent form. Before you make your decision, feel free to talk about this study with anyone you wish including your friends and family. Participation in this study is voluntary.
</p>
<p>
	This study has been reviewed by the University of Ontario Institute of Technology (Ontario Tech University) Research Ethics Board 15987 on 09/03/2020.
</p>

<p>
	<b><u>Purpose and Procedure:</u></b>
</p>
<p>
	<i>Purpose:</i>
</p>
<p>
	The purpose of this study is to determine whether distinct professional groups exhibit differencesin their performance when solving tasks involving visual representations of data (i.e., visualizations). The goal of the proposed project is to test that hypothesis in the context of professionals in Canada and the United States using an online study. If you are not in Canada or the United States, please do not participate in this study.
</p>
<p>
	<i>Procedures:</i>
</p>
<p>
	This study will involve an online study consisting of two parts: a screening stage and a testing stage. Both stages will take place through the web-based application that you are currently using, and you will only have to complete each stage once.  Your responsibility during the study is to complete the provided questions honestly and to the best of your ability. Please complete the study using a computer instead of a mobile device. The different screen and interaction environments of mobile devices and computers have the potential to confound the results of this study, and lead to inconsistent results across participants. This study has been designed for a computer as digital perceptual studies have historically been done using computers. The full study should take approximately 60 minutes.
</p>
<p>
	<b>Screening Stage:</b> You will be asked to complete a series of demographic questions and a color viewing test. The purpose of the screening stage is to check your eligibility for the testing stage and to collect information relevant to analyzing results from the testing stage.  To be eligible for the testing stage, you must be a member of one of the target professional groups, and have completed your undergraduate studies. This is to ensure that the study is sampling specialized professionals. There is a limit on the number of people who can participate in the testing stage from each profession, so you will be ineligible if the limit for your profession has already been met. Finally, the testing stage relies heavily on color, so you must pass color viewing tests to be eligible for the testing stage. If you are eligible, you will then be given access to the testing stage immediately after the screening stage. The screening stage should only require five minutes, though you are free to pause as you wish.
</p>
<p>
	<b>Testing Stage:</b> You will be asked to complete different types of visual comparison tasks (e.g., assessing the similarity between provided visuals). For each type of task, you will be given instructions on how to complete that particular task, and then the opportunity to do a practice test. The practice test gives you the opportunity familiarize yourself with the interactions relevant to task. No information will be collected from the practice tests. You will then run through a series of actual tests, and each test will have a time limit. During each test, the web application will collect your selections, the amount of time it took you to complete the test, and information for recreating the test condition (e.g., the resolution of your screen and the exact questions that you completed since some questions be taken from test banks). After each test, you will be asked to rate your level of confidence while performing that test. After completing the tests, you will beasked to reflect on the tests. The data from the testing stage will be connected to the demographic information that you provide during the screening stage. It is anticipated that the testing stage should take less than 60 minutes, though you are free to take breaks before and after each test.
</p>
<p>
	At the end of the testing stage, you will also be asked for your name, country, and email information in order to provide you with compensation. Note that your name, country, and email information will not be connected to or stored with any information you provide during the screening stage or your results from the testing stage.
</p>
<p>
	Statistical analysis will be performed on your responses and those of other participants to the screening and testing stages.
</p>

<p>
	<b><u>Potential Benefits:</u></b>
</p>
<p>
	Our study will reveal the unique characteristics of different professional communities in terms of their visualization task performance and spatial abilities, supporting the development of targeted information technologies. This has the potential to yield superior and novel digital solutions for those professional groups. By participating in our research, you will be supporting the development of digital tools that are tailored to your specific domain. You will not directly benefit from participating in this study.
</p>
<p>
	<b><u>Potential Risk or Discomforts:</u></b>
</p>
<p>
	There are no known or anticipated risks to you from participating in this study beyond what you regularly experience when using a computer. You are asked to complete the study on your computer, and will have to work at your computer for some time. It is possible that you may experience some fatigue or discomfort while completing the study; however, you have the opportunity to take breaks between tests or discontinue your participation. 
</p>
<p>
	Some of the tasks in this study are difficult, which may cause frustration. It is expected that participants will not be able to complete all tasks correctly – your true performance is what we are interested in, so there is no need to worry about getting everything right.
</p>
<p>
	<b><u>Use and Storage of Data: </u></b>
</p>
<p>
	All data from the screening and testing stages (excluding your name, country, and email information) will be retained indefinitely on the Ontario Tech campus in a password-protected database. Your information will be anonymized using a random numeric identifier. Anonymous data will be released publicly in part or in full, to facilitate replication, verification, and may be used for secondary research as a consequence of being made publicly available.
</p>
<p>
	Your name, country, and contact information collected to provide compensation will be stored separately from your research related information, and retained until you have been compensated. Please note that there may be a delay between when you complete the study, and when you are sent your compensation as we will be completing it manually.
</p>
<p>
	All confidential information collected during this study, including your personal information (i.e., name, country, and email), will be kept confidential and will not be shared with anyone outside the study unless required by law.  You will not be named in any reports, publications, or presentations that may come from this study.
</p>

<p>
	<b><u>Confidentiality:</u></b>
</p>
<p>
	Your name, country, and email information will never be connected to any test results and screening information. Only the researchers will ever have access to your name, country, and email information. All data will be password protected and stored on university machines. Following publication, your test data and demographic information may be released publicly in part or in full, to facilitate replication, verification.
</p>
<p>
	Your privacy shall be respected. No information about your identity will be shared or published without your permission, unless required by law. Confidentiality will be provided to the fullest extent possible by law, professional practice, and ethical codes of conduct. Please note that confidentiality cannot be guaranteed while data is in transit over the Internet.
</p>

<p>
	<b><u>Voluntary Participation:</u></b>
</p>
<p>
	Your participation in this study is voluntary and you may partake in only those aspects of the study in which you feel comfortable. You may also decide not to be in this study, or to be in the study now, and then change your mind later. You may leave the study at any time without affecting your relationship with the institution and investigators, if any. To withdraw from participation in this study close your browser at any time before the end of the study. If you choose to participate in the study, you will need to answer every question; it is not possible to skip questions or log a null response.
</p>

<p>
	<b><u>Right to Withdraw:</u></b>
</p>
<p>
	If you withdraw from the research project at any time before completion of the tasks, any data that you have contributed will be removed from the study and you do not need to offer any reason for making this request. To withdraw from the study, simply close the browser or stop answering questions before completion of the tasks. In this case, no data will be retained. Note that your name, country, and email information will never be associated with your other responses during the screening stage nor your responses to the testing stage. As such, your data from the screening and testing stages is anonymous. Due to the anonymous nature of the data we record, your data cannot be withdrawn after you have completed the study.
</p>
<p>
	Note that your results will be stored locally on your computer using memory options typical of web-based applications until you submit your results at the end of the testing stage. If you withdraw from the study, it is recommended that you clear this storage. How you clear such local storage depends on your browser.
</p>

<p>
	<b><u>Conflict of Interest:</u></b>
</p>
<p>
	Researchers have an interest in completing this study. Their interests should not influence your decision to participate in this study.
</p>

<p>
	<b><u>Compensation, Reimbursement, Incentives:</u></b>
</p>
<p>
	There is no compensation associated with the screening stage. If you are eligible to participate in the testing stage and complete it, you will be given an Amazon gift card valued at 20 dollars Canadian. Note that you must provide accurate contact information (name, country, and email address) to receive your compensation. Gift cards will be issued from the Amazon site of your country.
</p>

<p>
	<b><u>Debriefing and Dissemination of Results:</u></b>
</p>
<p>
	It is anticipated that the results of this study will be disseminated in a research publication about connections between variations in visualization task performance and individual factors (e.g., profession and visuospatial abilities). If you are interested in being informed about the results of the study, please let the researchers know by follow-up email.
</p>

<p>
	<b><u>Participant Rights and Concerns:</u></b>
</p>
<p>
	Please read this consent form carefully and feel free to ask the researcher any questions that you might have about the study. If you have any questions about your rights as a participant in this study, complaints, or adverse events, please contact the Research Ethics Office at (905) 721-8668 ext. 3693 or at researchethics@ontariotechu.ca.
</p>
<p>
	If you have any questions concerning the research study or experience any discomfort related to the study, please contact the researcher Christopher Collins at 905-721-8668 ext. 6581 or Christopher.Collins@ontariotechu.ca. 
</p>
<p>
	By verifying your agreement with form you do not give up any of your legal rights against the investigators, sponsor or involved institutions for compensation, nor does this form relieve the investigators, sponsor or involved institutions of their legal and professional responsibilities.
</p>

<p>
	<b><u>Consent to Participate:</u></b>
</p>
<p>
	1. I have read the consent form and understand the study being described.
</p>
<p>
	2. I have had an opportunity to ask questions and my questions have been answered. I am free to ask questions about the study in the future.
</p>
<p>
	3. I freely consent to participate in the research study, understanding that I may discontinue participation at any time without penalty. A copy of this Consent Form has been made available to me.
</p>
<p>
	<input id="consent" type="checkbox" name="consent" />
	<label for="consent">I agree</label>
</p>

<div>
	<p style="text-align:end">Version Date: 25-6-2020 Page 1 of 1</p>
</div>
</div>`;