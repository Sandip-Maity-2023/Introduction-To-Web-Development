import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generatePDF = async (patientData) => {
  try {
    // Data mapping from your Firestore keys
    const name = patientData.name || "N/A";
    const age = patientData.age || "N/A";
    const mobile = patientData.mobile || patientData.phone || "N/A";
    const village = patientData.village || "N/A";
    const status = patientData.cataract_status || "Unknown";
    const percentage = patientData.cataract_value || "0";
    const isPositive = status === 'Positive';
    
    const dateObj = patientData.createdAt?.seconds 
      ? new Date(patientData.createdAt.seconds * 1000) 
      : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page { margin: 0; }
            body { 
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
              margin: 0; padding: 0; color: #1A1A1A; background-color: #FFFFFF;
            }
            .page-container { padding: 40px; position: relative; }
            
            /* Modern Header Styles */
            .header { 
              display: flex; justify-content: space-between; align-items: center;
              border-bottom: 3px solid #00D4FF; padding-bottom: 20px; margin-bottom: 30px;
            }
            .brand { color: #020C18; }
            .brand h1 { margin: 0; font-size: 28px; letter-spacing: 1px; color: #0088CC; }
            .brand p { margin: 5px 0 0; font-size: 12px; font-weight: bold; color: #666; }
            
            .report-info { text-align: right; }
            .report-info p { margin: 2px 0; font-size: 11px; color: #888; }
            .report-id { color: #00D4FF; font-weight: bold; font-size: 13px; }

            /* Grid Layout for Patient Details */
            .section-title { 
              font-size: 14px; font-weight: 900; color: #00D4FF; 
              border-left: 4px solid #00D4FF; padding-left: 10px; margin: 30px 0 15px;
            }
            .patient-grid { 
              display: grid; grid-template-columns: 1fr 1fr; gap: 20px; 
              background: #F8FAFC; padding: 20px; border-radius: 12px;
            }
            .info-block { display: flex; flex-direction: column; }
            .info-label { font-size: 10px; color: #64748B; font-weight: bold; text-transform: uppercase; margin-bottom: 4px; }
            .info-value { font-size: 14px; color: #1E293B; font-weight: bold; }

            /* Diagnosis Premium Card */
            .diagnosis-card {
              margin-top: 40px; border-radius: 16px; overflow: hidden;
              border: 1px solid ${isPositive ? '#FEE2E2' : '#DCFCE7'};
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .card-header {
              background-color: ${isPositive ? '#FF3B30' : '#34C759'};
              padding: 15px; color: white; text-align: center;
            }
            .card-header h2 { margin: 0; font-size: 18px; letter-spacing: 2px; }
            
            .card-body { padding: 30px; text-align: center; background: white; }
            .status-large { 
              font-size: 32px; font-weight: 900; margin-bottom: 10px;
              color: ${isPositive ? '#B91C1C' : '#15803D'};
            }
            .confidence-meter {
              display: inline-block; padding: 8px 20px; border-radius: 20px;
              background: #F1F5F9; font-size: 14px; font-weight: bold; color: #475569;
            }

            /* Footer/Legal */
            .disclaimer { 
              margin-top: 60px; padding: 20px; border-radius: 8px; border: 1px dashed #CBD5E1;
              font-size: 11px; line-height: 1.6; color: #64748B; background: #F8FAFC;
            }
            .footer-strip {
              position: absolute; bottom: 40px; left: 40px; right: 40px;
              border-top: 1px solid #E2E8F0; padding-top: 20px;
              display: flex; justify-content: space-between; font-size: 10px; color: #94A3B8;
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <div class="header">
              <div class="brand">
                <h1>HEALTHCARE EYE SCAN</h1>
                <p>ADVANCED AI OPHTHALMOLOGY DIVISION</p>
              </div>
              <div class="report-info">
                <p class="report-id">REF: SCAN-${patientData.id?.slice(-6).toUpperCase() || 'UNKWN'}</p>
                <p>DATE: ${formattedDate}</p>
                <p>TIME: ${formattedTime}</p>
              </div>
            </div>

            <div class="section-title">PATIENT INFORMATION</div>
            <div class="patient-grid">
              <div class="info-block">
                <span class="info-label">Full Name</span>
                <span class="info-value">${name.toUpperCase()}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Age / Gender</span>
                <span class="info-value">${age} Years</span>
              </div>
              <div class="info-block">
                <span class="info-label">Contact Number</span>
                <span class="info-value">${mobile}</span>
              </div>
              <div class="info-block">
                <span class="info-label">Registered Location</span>
                <span class="info-value">${village}</span>
              </div>
            </div>

            <div class="section-title">DIAGNOSTIC ANALYSIS</div>
            <div class="diagnosis-card">
              <div class="card-header">
                <h2>AI SCREENING SUMMARY</h2>
              </div>
              <div class="card-body">
                <div class="status-large">
                  ${isPositive ? 'CATARACT DETECTED' : 'NORMAL / CLEAR'}
                </div>
                <div class="confidence-meter">
                  Analysis Confidence Level: ${percentage}%
                </div>
                <p style="font-size: 12px; color: #64748B; margin-top: 20px;">
                  The AI model has analyzed the pupillary region for lenticular opacity. 
                  Detection is based on neural network pattern recognition.
                </p>
              </div>
            </div>

            <div class="disclaimer">
              <strong>MEDICAL DISCLAIMER:</strong> This document is a preliminary screening report generated by 
              Healthcare Eye Scan AI systems. This is NOT a definitive medical diagnosis. Clinical findings from 
              a slit-lamp examination by a certified Ophthalmologist are required for surgical planning or medication.
            </div>

            <div class="footer-strip">
              <span>System Version: AI-OPHTHAL-v3.2</span>
              <span>www.healthcare-eyescan.ai</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent, base64: false });
    await Sharing.shareAsync(uri, { 
      UTI: '.pdf', 
      mimeType: 'application/pdf',
      dialogTitle: `Medical_Report_${name.replace(/\s/g, '_')}` 
    });
    
  } catch (error) {
    console.error("PDF Error:", error);
    Alert.alert("Print Error", "The report could not be generated at this time.");
  }
};