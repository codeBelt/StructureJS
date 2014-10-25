Option Explicit

Dim args
Set args = WScript.Arguments

Sub Unzip(source, destination)
	Dim fso, sap, files

	Set fso = CreateObject("Scripting.FileSystemObject")
	source = fso.GetAbsolutePathName(source)
	destination = fso.GetAbsolutePathName(destination)

	If NOT fso.FolderExists(destination) Then
		fso.CreateFolder(destination)
	End If

	Set sap = CreateObject("Shell.Application")
	Set files = sap.NameSpace(source).items
	sap.NameSpace(destination).CopyHere(files)

	fso.DeleteFile(source)
End Sub

Unzip args(0), args(1)
