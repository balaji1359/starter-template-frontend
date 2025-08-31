import { Html, Head, Preview, Body, Container, Heading, Text, Section } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactEmail = ({ name, email, message }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name} ({email})</Preview>
    <Body style={{ backgroundColor: '#f9f9f9', margin: 0, padding: 0 }}>
      <Container style={{ backgroundColor: '#fff', borderRadius: 8, padding: 32, margin: '40px auto', maxWidth: 480, boxShadow: '0 2px 8px #0001' }}>
        <Heading style={{ fontSize: 22, marginBottom: 16, color: '#222' }}>New Contact Form Submission</Heading>
        <Section>
          <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}><b>Name:</b> {name}</Text>
          <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}><b>Email:</b> <a href={`mailto:${email}`}>{email}</a></Text>
          <Text style={{ fontSize: 16, color: '#333', marginBottom: 16 }}><b>Message:</b></Text>
          <Text style={{ fontSize: 16, color: '#444', background: '#f4f4f4', borderRadius: 4, padding: 12 }}>{message}</Text>
        </Section>
        <Section style={{ marginTop: 32, borderTop: '1px solid #eee', paddingTop: 16 }}>
          <Text style={{ fontSize: 13, color: '#888' }}>
                    This message was sent from the BeeKeeper contact form.<br />
        If you have any questions, reply to <a href="mailto:contact@beekeeper.ai">contact@beekeeper.ai</a>.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail; 