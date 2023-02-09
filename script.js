var video = document.querySelector('.recording');
var output = document.querySelector('.output')
var start = document.querySelector('.start-btn')
var stop = document.querySelector('.stop-btn')
var anc = document.querySelector('.download-anc')
var data = [];
// in order to record the screen with system audio
var recording = navigator.mediaDevices.getDisplayMedia({
    video:{
        mediaSource:'screen'
    },
    audio:true,
})
    .then(async(e)=>{
        // for recording the mic audio
        let audio = await navigator.mediaDevices.getUserMedia({
            audio:true,video:false
        })
        // asssign the recorder media stream to the src object
        video.srcObject=e;

        // combine both video/audio stream with MediaStream object
        let combine = new MediaStream([
            ...e.getTracks(),...audio.getTracks()
        ])

        // record the captured mediaStream with mediaRecorder constructor

        let recorder = new MediaRecorder(combine);
        
        start.addEventListener('click',(e)=>{
            recorder.start();
            alert('recording started');
            // for a fresh start
            data=[]
        });

        stop.addEventListener('click',(e)=>{
            recorder.stop();
            alert("recording stopped");
        });


// push the recorded data to the data array with available data
        recorder.ondataavailable=(e)=>{
            data.push(e.data)
        };

        recorder.onstop=()=>{
            // convert the recorder audio to blob type mp4 media
            let blobData = new Blob(data,{type:'video/mp4'});
            //
            // convert the blob data to the url
            let url = URL.createObjectURL(blobData);
            output.src=url;
            asc.href=url;
        };

    });



