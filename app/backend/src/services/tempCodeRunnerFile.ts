    const email = 'dougls@dsd.com';

    const emailValidRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    const checkEmail = email.match(emailValidRegex);

    console.log(checkEmail);