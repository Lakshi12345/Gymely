
import axios from "axios";

const SERVER_URL =
"http://localhost:5000";

const DEVICE_SN =
"JNP2234300759";

const DEVICE_INFO = {

    sn:
    DEVICE_SN,

    deviceName:
    "ESSL Simulator",

    firmware:
    "iClock Proxy/1.09"

};

// Fake attendance users

const users = [

    "1001",

    "1002",

    "1003",

    "1004"

];

// Random attendance log

const generateAttendance =
    () => {

        const userId =

            users[
                Math.floor(
                    Math.random()
                    * users.length
                )
                ];

        const now =
            new Date();

        return `${userId}\t${now

            .toISOString()

            .replace(
                "T",
                " "
            )

            .slice(
                0,
                19
            )

        }\t0\t1`;

    };

// 1. Push Attendance

const pushAttendance =
async () => {

    try {

        const log =
        generateAttendance();

        console.log(
            "\n📤 Sending Attendance:"
        );

        console.log(
            log
        );

        const response =
        await axios.post(

            `${SERVER_URL}/iclock/cdata.aspx`,

            log,

            {

                params: {

                    SN:
                    DEVICE_SN,

                    table:
                    "ATTLOG",

                    Stamp:
                    9999

                },

                headers: {

                    "Content-Type":
                    "text/plain",

                    "User-Agent":
                    "iClock Proxy/1.09"

                }

            }

        );

        console.log(

            "✅ Attendance Sent:",

            response.data

        );

    } catch (
        error: any
    ) {

        console.log(

            "❌ Attendance Error:",

            error.message

        );

    }

};

// 2. Poll Command

const getCommand =
async () => {

    try {

        const response =
        await axios.get(

            `${SERVER_URL}/iclock/getrequest`,

            {

                params: {

                    SN:
                    DEVICE_SN

                },

                headers: {

                    "User-Agent":
                    "iClock Proxy/1.09"

                }

            }

        );

        const command =
        response.data;

        if (
            command
        ) {

            console.log(
                "\n📥 Command Received:"
            );

            console.log(
                command
            );

            await executeCommand(
                command
            );

        }

    } catch (
        error: any
    ) {

        console.log(

            "❌ Command Poll Error:",

            error.message

        );

    }

};

// 3. Fake Command Execution

const executeCommand =
async (
    command: string
) => {

    console.log(
        "\n⚙️ Executing..."
    );

    // Restart

    if (
        command.includes(
            "RESTART"
        )
    ) {

        console.log(
            "🔄 Device Restarted"
        );

    }

    // Fingerprint

    else if (

        command.includes(
            "ENROLL_FP"
        )

    ) {

        const pin =

            command.match(
                /PIN=(\d+)/
            )?.[1];

        console.log(

            `🖐️ Fingerprint Enroll Started for PIN ${pin}`

        );

    }

    // Open Gate

    else if (

        command.includes(
            "OPENDOOR"
        )

    ) {

        console.log(
            "🚪 Gate Opened"
        );

    }

    // Delete User

    else if (

        command.includes(
            "DELETE"
        )

    ) {

        console.log(
            "🗑️ User Deleted"
        );

    }

    // Command ACK

    await sendCommandAck(
        command
    );

};

// 4. Send Command Response

const sendCommandAck =
async (
    command: string
) => {

    try {

        await axios.post(

            `${SERVER_URL}/iclock/devicecmd`,

            `ID=1234&Return=0`,

            {

                headers: {

                    "Content-Type":
                    "text/plain"

                }

            }

        );

        console.log(
            "✅ Command ACK Sent"
        );

    } catch (
        error: any
    ) {

        console.log(

            "❌ ACK Error:",

            error.message

        );

    }

};

// Simulator Loop

const startSimulator =
() => {

    console.log(
        "\n🚀 ESSL Simulator Started"
    );

    console.log(
        `SN: ${DEVICE_SN}`
    );

    // Poll command every 5 sec

    setInterval(

        getCommand,

        5000

    );

    // Send attendance every 10 sec

    setInterval(

        pushAttendance,

        10000

    );

};

startSimulator();

