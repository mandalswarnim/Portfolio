---
title: "I built a lie detector out of my MacBook in a coffee shop"
date: 2026-11-25
excerpt: "An evening at Side Project: After Hours in Murasaki Coffee: two hours, about 25 engineers, a latte, and a 1970s polygraph running on a motion sensor Apple never told anyone about."
category: Events
cover: /blog/side-project-after-hours/lie.jpg
coverAlt: "The Model 7 Polygraph console stamping LIE over four scrolling pen traces"
---

On a Wednesday in November I spent the evening in a coffee shop by Tower Bridge turning my laptop into a polygraph. Then I strapped strangers to it. Well, I asked them to rest their wrists on it, which is close enough.

## The invite

I found **[Side Project: After Hours](https://luma.com/9srn9ba2)** on Luma. The idea is simple. Murasaki Coffee on Tower Bridge Road stays open after closing, about 25 builders turn up with laptops, and you get two hours to make something that makes the room react. At 8:30 the laptops get turned around and everyone has a minute to show what they made.

The brief said a tiny game, a strange website, something useful, or something "beautifully unnecessary". I knew straight away which of those I was going for.

## The idea, over noodles

The idea came earlier that day over lunch at Kung Fu Noodles on the way to the event.

Apple Silicon MacBook Pros have an accelerometer and gyroscope inside the sensor processor that Apple has never documented. There's an open-source library that can read it. And if a laptop can feel itself move, it can feel *you* move. Rest your wrists on the palm rest, get asked an awkward question, and every little squirm goes straight into the chassis.

That's a lie detector. A bad one, scientifically, but a brilliant one theatrically. That was the whole pitch: no extra hardware (no watch, no phone, no webcam), just the laptop.

## Two hours, one latte

![My MacBook on a round wooden café table at Murasaki Coffee, the terminal mid-recording, next to a latte with a horse drawn in the foam](/blog/side-project-after-hours/cafe-table.jpg)

By the time I sat down I had a Python process streaming the sensor over a WebSocket. So I spent the first part of the evening doing the least glamorous part of any project, which is collecting data. In the photo above the terminal is walking me through recording sessions: *wrists on, still… hands off… wrists on, light touch… hands off*. The latte with the horse in it was a bonus.

The recordings gave me some bad news.

## The sensor wasn't good enough on its own

My original plan was to read the **heartbeat** through the palm rest. A pulse makes tiny movements, and the IMU samples at 800 Hz. Over a full minute you really can see a faint peak at the right heart rate. But over the 10 seconds it takes someone to answer a question, the estimate landed within ±5 BPM only about a third of the time. The machine couldn't even reliably tell whether wrists were on the laptop at all.

What the sensor *was* great at was **movement**. A small hand shift, a squirm, someone shifting their weight: it picks all of them up clearly against the person's own stillness. So I stopped trying to make one signal do everything and built the verdict from several:

- **Movement:** fidgeting on the palm rest compared with your own calm baseline. This is the main signal.
- **Answer delay:** from the microphone, how long you hesitate before answering.
- **Voice pitch:** whether your voice goes up compared with how you said your name during calibration.
- **Pulse:** only counted when the reading is confident, which is rarely.

The console also draws a **GSR** (galvanic skin response) pen like the real thing. There's no skin sensor in a MacBook, so that trace is built from your movement and voice. It's mostly for show.

And the heart rate that wouldn't lock became the best joke of the night. If the machine can't find your pulse after 12 seconds, it flashes **"SUBJECT'S HEART UNREADABLE — HIGHLY SUSPICIOUS"**.

## Making it look the part

Then, with the clock running, I built the bit people would actually see: the **Model 7 Polygraph**. It's a 1970s-style console with graph paper scrolling under four ink pens, a brass pulse gauge, signal lamps and a typewriter caption. It even has synthesised relay clicks and pen scratch.

![Calibration: the console asks the subject to remain perfectly still and hold their breath](/blog/side-project-after-hours/calibrating.jpg)

Every volunteer starts by sitting still while the machine learns their "normal". Then they state their name as a control question. After that the operator picks questions with the number keys:

![Question 2 on screen: "Have you ever pretended to understand a bug you didn't?"](/blog/side-project-after-hours/question.jpg)

The questions were written for a room full of engineers: *Did you actually read the README? Have you ever shipped on a Friday? Have you ever said "it works on my machine"?* The ones people usually lie about get a little extra suspicion.

After the answer the pens go wild for a few seconds ("ANALYSING…"), and then a rubber stamp slams down with a screen shake:

![A green TRUTH stamp, deception index 14: "Movement nominal. Answered in 0.4 s. The machine will allow it. This time."](/blog/side-project-after-hours/truth.jpg)

![A red LIE stamp, deception index 58: "The machine has notified your mother."](/blog/side-project-after-hours/lie.jpg)

## Demo time

When the demos came round, the Model 7 went up on the projector and a volunteer took the hot seat with their wrists on my palm rest. The machine asked things like *"Did you actually read the README?"*, the pens went wild, and the stamps came down. The room laughed the whole way through, which was exactly the "make the room go wow" the brief asked for.

![Me in the grey hoodie at the controls while the projector asks the volunteer "Have you ever pretended to understand a bug you didn't?"](/blog/side-project-after-hours/demo-controls.jpg)

The evening was livestreamed by London Tech Studio, so you can watch the whole demo:

::youtube{id=86TvU83Swsw start=6764 end=6972 poster=/blog/side-project-after-hours/demo-me.jpg title="My lie detector demo at Side Project: After Hours (livestream by London Tech Studio, 1:52:44–1:56:12)"}

## What I took home

A working lie detector (for a generous definition of "working") and, more importantly, some great connections. A room of people who give up an evening to build something for fun is a really good room to be in.

The code is all on GitHub: **[mandalswarnim/lie-detector](https://github.com/mandalswarnim/lie-detector)**. There's a fake-sensor mode, so you can try the whole show without `sudo` or an M-series MacBook. It's theatre built on real signals, so please don't use it in court.
