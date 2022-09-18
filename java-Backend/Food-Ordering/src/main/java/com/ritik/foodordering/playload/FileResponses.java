package com.ritik.foodordering.playload;

public class FileResponses {
	
	private String fileName;
	private String message;
	
	
	public FileResponses(String fileName, String message) {
		super();
		this.fileName = fileName;
		this.message = message;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}
	
	
	

}
