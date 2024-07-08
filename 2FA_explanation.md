<a name="top"></a>

---

<a name="basic-idea"></a>
<details>
<summary><strong style="color: Olive; font-size: 20px;">1. The basic idea behind 2FA</strong></summary>

Two-Factor Authentication (2FA) is a critical security measure designed to enhance the protection of digital accounts by <u><b>requiring two distinct forms of identification to verify a user's identity before granting access.</u></b>

Forms can be categorized as follows:

- <b>Something the User Knows:</b> This is typically a password or PIN. It's something the user must remember and input during the authentication process.

- <b>Something the User Has:</b> This could be a security token, a mobile device, or a physical key. It's something the user possesses and can present to prove their identity.

</details>

---

<details>
<summary><strong style="color: Green; font-size: 20px;">2. Glossary</strong></summary>

<div style="margin-left: 20px;">
<details><summary><strong>JSON Object:</strong></summary>
<p>A JSON (JavaScript Object Notation) object is a <strong>data format used to represent structured data in a way that is easy for both humans to read and machines to parse and generate.</strong></p>

<p>JSON is commonly used for data exchanges between a server and a client in web applications, as well as for configuration files and data storage in various software applications.</p>

<p>For example:</p>

<pre><code class="language-json">{
    "name": "Yako Cherry",
    "age": 17,
    "email": "yako.cherry@example.com",
    "isStudent": false,
    "courses": ["Math", "Science", "History"],
    "address": {
        "street": "42 rue des pantoufles",
        "city": "Paris",
        "postalCode": "75000"
    }
}</code></pre>
</details>
</div>

<div style="margin-left: 20px;">
<details><summary><strong>JSON Web Token (JWT):</strong></summary>
<p><strong>A string</strong> representing a set of claims as JSON object that is encoded in a JWS or JWE, enabling the claims to be digitally signed or MACed and/or encrypted.</p>
<p>A JWT is a compact, URL-safe token used to securely transmit information between parties as a JSON object. This information can be verified and trusted because it is <strong>digitally signed.</strong></p>

<p>Example of a JWT:</p>

<pre><code class="language-json">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
</details>
</div>
</details>

---
<a name="code-example"></a>
<details>
<summary><strong style="color: Maroon; font-size: 20px;">3. Code Example</strong></summary>

### 1. Login and Generating 2FA Code:


```sh
curl -X POST http://127.0.0.1:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "yako.cherry@example.com", "password": "password123"}'
```
---
### 2. Verifying 2FA Code and Getting JWT:
- Check the terminal ouput for the generated 2FA code then insert in the following code: (remove angle brackets as well)
```sh
curl -X POST http://127.0.0.1:5000/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "yako.cherry@example.com", "code": "<Insert 2fa code here>"}'
```
- Upon successful verification, we receive a **JWT token** in that form:
```
{"token": "generated_jwt_token"}
```
---
### 3. Accessing Protected Route with JWT:
- Insert the generated JWT token then insert it in the following code:
```sh
curl http://127.0.0.1:5000/protected \
  -H "Authorization: Bearer <Insert JWT_token_here>"
```
</details>

---
[Back to Top](#top)