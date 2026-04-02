---
outdated: true
showInBlog: false
title: 'Assertions and Rules in MarvinFX'
date: "2013-03-20"
author: hendrik
categories: [JavaFX]
excerpt: 'Today I added some new features to MarvinFX. For all basic property types (String, Number, Boolean, etc...) MarvinFX will provide methods to check some common assertions for this properties. '
preview_image: "/posts/preview-images/software-development-green.svg"
---
Today I added some new features to [MarvinFX](/posts/2013-03-17-introducing-marvinfx). For all basic property types (String, Number, Boolean, etc...) MarvinFX will provide methods to check some common assertions for this properties. All this methods will be part of the PropertySupervisor classes. Here is a short example that tests a String property:

```java@Test
public void test5() {
	TextField textField = new TextField("Hello MarvFX");
	MarvinFx.show(textField);</p>
	TextfieldFixture<TextField> textfieldFixture = new TextfieldFixture<>(textField);
	StringPropertySupervisor supervisor = textfieldFixture.createTextPropertySupervisor();</p>
	supervisor.assertStringEndsWith("MarvFX");
	supervisor.assertStringStartsWith("Hello");
	supervisor.assertStringLenghtIsEquals(12);
	supervisor.assertStringLenghtIsGreaterThan(11);
	supervisor.assertStringLenghtIsLessThan(13);
}```

All this methods work internally with so called MarvinFXRules. For every assertion MarvinFX provides a special rule. You can simply write your own rules and check them with the supervisor:

```java@Test
public void test5() {
	TextField textField = new TextField("Hello MarvFX");
	MarvinFx.show(textField);</p>
	TextfieldFixture<TextField> textfieldFixture = new TextfieldFixture<>(textField);
	StringPropertySupervisor supervisor = textfieldFixture.createTextPropertySupervisor();</p>
	//Custom Rule
	StringEndsWithRule rule = new StringEndsWithRule("MarvFX");
	supervisor.checkAssertion(rule);
}```

Because every assertion is encapsulated in a MarvinRule you can use a underlying API and boolean logic to combine them:

```java@Test
public void test5() {
	TextField textField = new TextField("Hello MarvFX");
	MarvinFx.show(textField);</p>
	TextfieldFixture<TextField> textfieldFixture = new TextfieldFixture<>(textField);
	StringPropertySupervisor supervisor = textfieldFixture.createTextPropertySupervisor();</p>
	StringEndsWithRule rule1 = new StringEndsWithRule("MarvFX");
	StringStartsWithRule rule2 = new StringStartsWithRule("Hello");
	StringStartsWithRule wrongRule1 = new StringStartsWithRule("ABC");</p>
	supervisor.checkAssertion(rule1.and(rule2));
	supervisor.checkAssertion(rule1.or(rule2));
	supervisor.checkAssertion(wrongRule1.or(rule1));
	supervisor.checkAssertion(wrongRule1.or(rule1).and(rule2));
	supervisor.checkAssertion(rule1.and(rule2).or(wrongRule1));
	supervisor.checkAssertion(rule1.and(rule2).or(wrongRule1.or(rule2)));
}```

Hope you like this ;)
