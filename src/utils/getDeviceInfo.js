export const getDeviceInfo = (req) => {
    const ipAddress =
        req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const deviceName = userAgent.match(/\(([^)]+)\)/)[1];

    return {
        ipAddress,
        deviceName,
    };
};
