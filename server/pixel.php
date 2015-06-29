<?php

# output cookie
setcookie('cookie_id', "123456");

# output the 1x1 image
header("Content-Type: image/gif");
echo base64_decode("R0lGODdhAQABAIAAAPxqbAAAACwAAAAAAQABAAACAkQBADs=");





