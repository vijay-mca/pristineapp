package com.pristineapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class OrderActivity extends AppCompatActivity {
    @Override
    protected  void onCreate(Bundle saveInstanceState) {

        super.onCreate(saveInstanceState);
        setContentView(R.layout.activity_order);
        Intent intent = getIntent();
        if (intent != null && intent.getData() != null) {
            ((TextView)findViewById(R.id.textView)).setText(intent.getData().toString());
        }
    }
}
