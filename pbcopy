from google.cloud import language

def language_analysis(text):
	client = language.Client()
	document = client.document_from_text(text)
	sent_analysis = document.analyze_sentiment()
	print(dir(sent_analysis))
	sentiment = sent_analysis.sentiment
	ent_analysis = document.analyze_entities()
	entities = ent_analysis.entities
	return sentiment, entities

example_text = 'is it not obvious that uncc is the best school in NC?'

sentiment, entities = language_analysis(example_text)
print(sentiment.score, sentiment.magnitude)

for e in entities:
	print(e.name, e.entity_type, e.metadata, e.salience)
