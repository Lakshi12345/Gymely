import express from "express";
import {io} from '../server';


const router = express.Router();

router.post(

    "/cdata.aspx",

    (
        req,
        res
    ) => {

        console.log(
            "Attendance:"
        );

        console.log(
            req.body
        );

        io.emit(

            "attendance",

            {

                memberName:
                    "Lakshikanta Gorai",

                time:
                    "12:55 PM"

            }

        );


        res.send(
            "OK"
        );

    }

);
let commandSent =
    false;
router.get(

    "/getrequest",

    (
        req,
        res
    ) => {

        console.log(

            "Polling From:",

            req.query.SN

        );

        if (
            !commandSent
        ) {

            commandSent =
                true;

            return res.send(

                "C:1234:RESTART"

            );

        }

        return res.send(
            ""
        );

    }

);

router.post(

    "/devicecmd",

    (
        req,
        res
    ) => {

        console.log(
            "\n✅ Device ACK"
        );

        console.log(
            req.body
        );

        res.send(
            "OK"
        );

    }

);

router.get(

    "/test",

    (
        req,
        res
    ) => {

        io.emit(

            "attendance",

            {

                memberName:
                    "Lakshikanta Gorai",

                time:
                    "12:55 PM"

            }

        );

        res.send(
            "Sent"
        );

    }

);

export default
router;