// try to connect to IP and port in config.js
	// give error

var startUp={}

startUp.start=function()
{
	rpc.data_fetch('hasRun',startUp.firstConnect);
	$('#status').text("Connecting to: "+SERVER_IP+' '+SERVER_PORT);
	$('#error').text('');
	
	$('#ServerDisplay').text("Connecting to: "+SERVER_IP+' '+SERVER_PORT);
}

startUp.firstConnect= function(response,success) 
{
	if(success)
	{
		$('#status').text(JSON.stringify(response));
		
		if(response.result.value)
		{
			rpc.data_fetch('MasterKey',startUp.getMaster);
		}else
		{
			ncc.displayScreen('WelcomeScreen');
			rpc.data_store('hasRun','1');	
		}
	}else 
	{
		$('#status').text('');
		ncc.displayScreen('NoServerScreen');
		ncc.serverDown();
	}
};

startUp.getMaster=function(response,success) 
{
	if(success)
	{
		$('#status').text(JSON.stringify(response));
		
		if(response.result.value)
		{
			ncc.masterKey=response.result.value;
			$("#MasterKey").val(ncc.masterKey);
			$('#InfoMasterKey').text(ncc.masterKey);
			
			rpc.wallet_accounts(ncc.masterKey,ncc.loginResponse);
		}else
		{
			ncc.displayScreen('LoginScreen');
		}
	}else ncc.serverDown();
};	
	