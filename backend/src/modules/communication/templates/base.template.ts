export const baseTemplate = (title: string, content: string) => {
    return `
        <!DOCTYPE html>

        <html>

        <head>
            <meta charset="UTF-8" />

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f5f5f5;
                    padding: 20px;
                }

                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                }

                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: gray;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h2>${title}</h2>

                ${content}

                <div class="footer">
                    © Gymely
                </div>
            </div>
        </body>

        </html>
    `;
};
