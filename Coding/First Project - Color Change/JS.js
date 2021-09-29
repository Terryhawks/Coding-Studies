const button = document.querySelector('button'), body = document.querySelector('body')

            var name = prompt ("What's your name?")

            document.getElementById("greeting").innerHTML = "Hello " + name + "!"
            function rainbow() {
                return '#' + parseInt(Math.random() * 0xffffff).toString(16)
            }
            function changeColor() {
                var colorLocal = rainbow();
                body.style.backgroundColor = colorLocal
                document.getElementById('BGCM').innerHTML="This Is in " + colorLocal + " Color"
            }