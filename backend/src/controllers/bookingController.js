import nodemailer from 'nodemailer';
import Booking from '../models/Booking.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// @desc    Get all booking records
// @route   GET /api/bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("❌ Database fetch failure:", error);
        res.status(500).json({ success: false, error: "Internal server staging crash." });
    }
};

// @desc    Create a new booking record
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
    try {
        const { 
            client, 
            car, 
            service, 
            date, 
            time, 
            status, 
            phone, 
            email, 
            notes, 
            estHpGains, 
            fuelType, 
            technician 
        } = req.body;

        const newBooking = new Booking({
            client,
            car,
            service,
            date,
            time,
            status: status || 'PENDING',
            phone: phone || 'N/A',
            email: email || 'N/A',
            notes: notes || 'No custom technician notes submitted.',
            estHpGains: estHpGains || 'N/A',
            fuelType: fuelType || 'N/A',
            technician: technician || 'TBD (Unassigned)'
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, data: savedBooking });
    } catch (error) {
        console.error("❌ Database staging failure during creation:", error);
        res.status(500).json({ success: false, error: "Internal server staging crash." });
    }
};

// @desc    Update a booking status & dispatch email alert
// @route   PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        const updatedBooking = await Booking.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, error: "Booking record not found" });
        }

        if (updatedBooking.email && updatedBooking.email !== 'N/A') {
            let emailSubject = '';
            let emailBody = '';

            if (status === 'APPROVED') {
                emailSubject = `⚡ APEX DESIGN STUDIO - BOOKING APPROVED [${updatedBooking.id}]`;
                emailBody = `
                    <div style="background-color: #030303; color: #ffffff; padding: 40px; font-family: sans-serif; border: 1px solid #111; max-width: 600px; margin: auto; border-radius: 16px;">
                        <span style="color: #00C2FF; font-size: 10px; font-weight: bold; text-transform: uppercase;">VIP DISPATCH CLEARANCE</span>
                        <h2 style="color: #ffffff; text-transform: uppercase; font-size: 24px; font-weight: 900;">Session Reserved<span style="color: #00C2FF;">.</span></h2>
                        <p>Dear ${updatedBooking.client},</p>
                        <p>Your luxury custom consultation request has been <strong>APPROVED</strong> and locked into our live telemetry workshop queue.</p>
                        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin: 25px 0;">
                            <p><strong>🏎️ SUPERCAR:</strong> ${updatedBooking.car}</p>
                            <p><strong>🛠️ TARGET CONFIG:</strong> ${updatedBooking.service}</p>
                            <p><strong>📅 SCHEDULED SLOT:</strong> ${updatedBooking.date} | ${updatedBooking.time}</p>
                        </div>
                        <p style="color: #737373; font-size: 11px;">Please arrive 10 minutes prior to your slot.</p>
                    </div>
                `;
            } else if (status === 'COMPLETED') {
                emailSubject = `🏁 APEX DESIGN STUDIO - MISSION ACCOMPLISHED [${updatedBooking.id}]`;
                emailBody = `
                    <div style="background-color: #030303; color: #ffffff; padding: 40px; font-family: sans-serif; border: 1px solid #111; max-width: 600px; margin: auto; border-radius: 16px;">
                        <span style="color: #10b981; font-size: 10px; font-weight: bold; text-transform: uppercase;">PIPELINE ARCHIVED</span>
                        <h2 style="color: #ffffff; text-transform: uppercase; font-size: 24px; font-weight: 900;">Bespoke Build Ready<span style="color: #10b981;">.</span></h2>
                        <p>Dear ${updatedBooking.client},</p>
                        <p>The master transformation pipeline on your <strong>${updatedBooking.car}</strong> is officially <strong>COMPLETED</strong>.</p>
                        <p style="color: #737373; font-size: 11px; font-weight: bold; text-align: center;">LAUNCH HARD. DRIVE SAFE.</p>
                    </div>
                `;
            }

            if (emailSubject && emailBody) {
                const mailOptions = {
                    from: `"APEX DESIGN STUDIO" <${process.env.EMAIL_USER}>`,
                    to: updatedBooking.email,
                    subject: emailSubject,
                    html: emailBody
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.error("❌ Telemetry Mailer Failure:", err);
                    else console.log("⚡ Automated Clearance Email Dispatched:", info.response);
                });
            }
        }

        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server staging crash." });
    }
};

// @desc    Delete a booking record
// @route   DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ success: false, error: "Booking record not found" });
        }

        res.status(200).json({ success: true, message: "Booking record purged successfully." });
    } catch (error) {
        console.error("❌ Purge failure:", error);
        res.status(500).json({ success: false, error: "Internal server staging crash." });
    }
};