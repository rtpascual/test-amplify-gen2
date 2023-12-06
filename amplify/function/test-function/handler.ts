export const handler = async (event: any) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    }
}