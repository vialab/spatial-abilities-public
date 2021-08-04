export class ConfidenceWindow
{
	public OnSubmit : () => void;
	public OnRetryLoading : () => void;
	
	constructor()
	{
		this.OnSubmit = () => {};
		this.OnRetryLoading = () => {};

		$("#begin-test").click(() =>
		{
			this.OnSubmit();
			this.Hide();
		});

		$("#retry-loading").click(() =>
		{
			this.OnRetryLoading();
		});
	}

	public Show()
	{
		$("#transition").show();

		$("body").css("height", "100vh");
		$("body").css("overflow", "hidden");
	}

	public Hide()
	{
		$("#transition").hide();

		$("body").css("height", "");
		$("body").css("overflow", "");
	}

	public ShowConfidenceBar()
	{
		$("#confidence-bar").show();
	}

	public HideConfidenceBar()
	{
		$("#confidence-bar").hide();
	}

	public ShowLoading()
	{
		$("#next-test-ready").hide();
		$("#loading-failed").hide();
		$("#next-test-loading").show();
	}

	public ShowNextTestReady()
	{
		$("#next-test-loading").hide();
		$("#loading-failed").hide();
		$("#next-test-ready").show();
	}

	public ShowLoadingFailed()
	{
		$("#next-test-loading").hide();
		$("#next-test-ready").hide();
		$("#loading-failed").show();
	}

	public ResetConfidence()
	{
		$("#confidence").val(50);
	}

	public ConfidenceValue() : number
	{
		return Number.parseFloat(<string>$("#confidence").val());
	}
}