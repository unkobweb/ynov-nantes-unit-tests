<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{  
    public function test_should_work() {
        $this->assertEquals(flatten([[1,2,3],4]), [1,2,3,4]);
        $this->assertEquals(flatten([[1,2,3],[4,5]]), [1,2,3,4,5]);
    }

    public function test_wrong_type()
    {
        $this->expectError(PHPUnit\Framework\Error\Error::class);
        flatten('hello world!');
    }

    public function test_empty_array()
    {
        $this->assertEquals(flatten([]), []);
    }
}