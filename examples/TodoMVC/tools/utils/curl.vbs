Option Explicit

Dim args
Set args = WScript.Arguments

Sub Curl(source, destination)
	Dim http, fso, destinationDir, ado
	
	Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
	http.Open "GET", source, False
	http.Send

	If http.Status <> 200 Then
		WScript.Echo "FAILED to download: HTTP Status " & http.Status
		WScript.Quit 1
	End If

	Set fso = CreateObject("Scripting.FileSystemObject")
	destinationDir = fso.GetParentFolderName(destination)
	destination = fso.GetAbsolutePathName(destination)

	If NOT fso.FolderExists(destinationDir) Then
		fso.CreateFolder(destinationDir)
	End If

	If fso.FileExists(destination) Then
		fso.DeleteFile destination
	End If

	Set ado = CreateObject("ADODB.Stream")
	ado.Open
	ado.Type = 1
	ado.Write http.ResponseBody
	ado.Position = 0
	ado.SaveToFile destination
	ado.Close
End Sub

Curl args(0), args(1)
