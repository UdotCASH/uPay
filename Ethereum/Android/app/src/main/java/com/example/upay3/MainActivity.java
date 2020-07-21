package com.example.upay3;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.journeyapps.barcodescanner.BarcodeEncoder;

import net.glxn.qrgen.javase.QRCode;

import java.io.ByteArrayOutputStream;
import java.io.File;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onButtonTap(View v){
        Toast t = Toast.makeText(getApplicationContext(), "Payment Address Generated", Toast.LENGTH_LONG);
        t.show();

        final TextView textView = (TextView) findViewById(R.id.addressTextView);

// Instantiate the RequestQueue.

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://evening-lake-24705.herokuapp.com/getPaymentAddress";
// Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        textView.setText(response);
                        //document.getElementById("paymentQR").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + activePaymentAddress

//                        ByteArrayOutputStream stream = QRCode.from("Hello World").stream();
//                        Bitmap bitmap = BitmapFactory.decodeStream(ByteArrayOutputStream);
//                        //Bitmap myBitmap = QRCode.from("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + response).bitmap();
                        ImageView myImage = (ImageView) findViewById(R.id.QRCODE);
//                        Uri uri = Uri.fromFile(file);
//                        myImage.set
                        //myImage.setImageBitmap(myBitmap);

                        String text=response;
                        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
                        try {
                            BitMatrix bitMatrix = multiFormatWriter.encode(text, BarcodeFormat.QR_CODE,555,555);
                            BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
                            Bitmap bitmap = barcodeEncoder.createBitmap(bitMatrix);
                            myImage.setImageBitmap(bitmap);
                        } catch (WriterException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                textView.setText("That didn't work!");
                String err = error.toString();
                Toast tt = Toast.makeText(getApplicationContext(), err, Toast.LENGTH_LONG);
                tt.show();
            }
        });

// Add the request to the RequestQueue.
        queue.add(stringRequest);

    }
}