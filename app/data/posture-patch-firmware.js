/** Arduino sketch for Posture Patch — displayed on the project page. */
export const POSTURE_PATCH_FIRMWARE = `#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

Adafruit_MPU6050 mpu;

const int buttonPin = 10;
const int motorPin = 5;

float ax_f = 0, ay_f = 0, az_f = 0;
const float alpha = 0.15;
const float alphaCF = 0.95;   // lowered from 0.98 to reduce drift

float fusedAngle = 0;
float baselineAngle = 0;
float gyroBiasY = 0;

unsigned long lastTime = 0;
unsigned long lastPress = 0;
const int debounceTime = 300;

const float threshold = 5.0;
const unsigned long holdTime = 2000;

unsigned long slouchStart = 0;
bool slouching = false;
bool alertOn = false;

// keep angle difference in [-180, 180]
float angleDiff(float a, float b) {
  float diff = a - b;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return diff;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(8, 9);

  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW);

  if (!mpu.begin()) {
    Serial.println("MPU6050 not found");
    while (1);
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_4_G);
  mpu.setGyroRange(MPU6050_RANGE_250_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

  Serial.println("Keep sensor still: calibrating gyro...");
  float sumGy = 0;
  const int samples = 300;

  for (int i = 0; i < samples; i++) {
    sensors_event_t a, g, t;
    mpu.getEvent(&a, &g, &t);
    sumGy += g.gyro.y;
    delay(5);
  }

  gyroBiasY = sumGy / samples;

  sensors_event_t a, g, t;
  mpu.getEvent(&a, &g, &t);

  ax_f = a.acceleration.x;
  ay_f = a.acceleration.y;
  az_f = a.acceleration.z;

  fusedAngle = atan2(ax_f, sqrt(ay_f * ay_f + az_f * az_f)) * 180.0 / PI;
  baselineAngle = fusedAngle;
  lastTime = millis();

  Serial.println("System ready");
}

void loop() {
  sensors_event_t a, g, t;
  mpu.getEvent(&a, &g, &t);

  float ax = a.acceleration.x;
  float ay = a.acceleration.y;
  float az = a.acceleration.z;

  ax_f = alpha * ax + (1 - alpha) * ax_f;
  ay_f = alpha * ay + (1 - alpha) * ay_f;
  az_f = alpha * az + (1 - alpha) * az_f;

  float accelAngle = atan2(ax_f, sqrt(ay_f * ay_f + az_f * az_f)) * 180.0 / PI;

  unsigned long now = millis();
  float dt = (now - lastTime) / 1000.0;
  lastTime = now;

  if (dt <= 0 || dt > 0.5) dt = 0.02;

  float gyroRate = (g.gyro.y - gyroBiasY) * 180.0 / PI;

  fusedAngle = alphaCF * (fusedAngle + gyroRate * dt) + (1 - alphaCF) * accelAngle;

  if (digitalRead(buttonPin) == LOW && now - lastPress > debounceTime) {
    baselineAngle = fusedAngle;
    Serial.println("Baseline recalibrated!");
    lastPress = now;
  }

  float deviation = abs(angleDiff(fusedAngle, baselineAngle));

  float gx = g.gyro.x;
  float gy = g.gyro.y;
  float gz = g.gyro.z;
  float gyroMag = sqrt(gx * gx + gy * gy + gz * gz);

  bool postureBad = deviation > threshold;
  bool bodySettled = gyroMag < 1.00;

  if (postureBad && bodySettled) {
    if (!slouching) {
      slouching = true;
      slouchStart = now;
    }

    if (now - slouchStart >= holdTime) {
      alertOn = true;
    }
  } else {
    slouching = false;
    alertOn = false;
    slouchStart = now;
  }

  if (alertOn) {
    digitalWrite(motorPin, HIGH);
  } else {
    digitalWrite(motorPin, LOW);
  }

  Serial.print("Accel angle: ");
  Serial.print(accelAngle);
  Serial.print("  Fused angle: ");
  Serial.print(fusedAngle);
  Serial.print("  Deviation: ");
  Serial.print(deviation);
  Serial.print("  GyroMag: ");
  Serial.print(gyroMag);
  Serial.print("  Alert: ");
  Serial.println(alertOn ? "ON" : "OFF");

  delay(1000);
}
`
